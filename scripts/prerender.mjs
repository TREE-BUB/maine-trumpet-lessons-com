// Build-time static site generation for GitHub Pages.
//
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
// For every route it renders the React tree to HTML, injects the markup and
// the react-helmet-async <head> tags into the client build's index.html, and
// writes a real file to disk. Also emits the 404 page, the legacy-URL stubs
// and sitemap.xml.

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { ROUTES, LEGACY_REDIRECTS, SITE_URL, absoluteUrl } from '../src/routes.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, '.ssr', 'entry-server.js')

const { render } = await import(pathToFileURL(ssrEntry).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  throw new Error('index.html is missing the <!--app-html--> / <!--app-head--> markers')
}

function writeFile(relPath, contents) {
  const target = path.join(dist, relPath)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, contents)
  return relPath
}

function renderPage(routePath) {
  const { html, head } = render(routePath)
  // Function replacers, not strings: String.replace interprets $$, $&, $` and
  // $' in a replacement string, which would corrupt rendered content such as
  // the JSON-LD priceRange "$$".
  return template
    .replace('<!--app-head-->', () => head)
    .replace('<!--app-html-->', () => html)
}

/**
 * GitHub Pages resolves an extensionless request by trying `<path>.html`
 * before `<path>/index.html`. Emitting both means /lessons answers 200
 * directly instead of 301-ing to /lessons/, so the self-referencing
 * canonical never points at a redirect.
 */
function writePage(routePath, contents) {
  if (routePath === '/') return [writeFile('index.html', contents)]
  const slug = routePath.replace(/^\//, '')
  return [
    writeFile(`${slug}.html`, contents),
    writeFile(`${slug}/index.html`, contents),
  ]
}

// --- last-modified dates -----------------------------------------------------

function git(args) {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf-8' }).trim()
  } catch {
    return ''
  }
}

const headDate = git(['log', '-1', '--format=%cs']) || new Date().toISOString().slice(0, 10)

function lastModified(route) {
  // Deliberately narrow: the page's own component plus the manifest that holds
  // its title and description. Chrome-only edits (nav, footer) must not mark
  // all six pages as updated, or lastmod stops meaning anything.
  const sources = [route.source, 'src/routes.js']
  const dates = sources
    .map((f) => git(['log', '-1', '--format=%cs', '--', f]))
    .filter(Boolean)
  return dates.length ? dates.sort().at(-1) : headDate
}

// --- real pages --------------------------------------------------------------

const written = []
for (const route of ROUTES) {
  written.push(...writePage(route.path, renderPage(route.path)))
}

// --- 404 ---------------------------------------------------------------------
// GitHub Pages serves 404.html with a genuine 404 status for any unmatched
// path. Rendering the app's NotFound route gives it the site chrome.
written.push(writeFile('404.html', renderPage('/__not_found__')))

// --- legacy URL stubs --------------------------------------------------------
// These paths are still in Google's index from a previous version of the site.
// GitHub Pages cannot issue a 301, so each stub carries a canonical and a
// meta refresh to the closest live equivalent, plus a visible fallback link.

function legacyStub(from, to) {
  const target = absoluteUrl(to)
  const label = to === '/' ? 'the homepage' : `the ${to.replace('/', '')} page`
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Moved — Maine Trumpet Lessons</title>
  <link rel="canonical" href="${target}" />
  <meta http-equiv="refresh" content="0; url=${target}" />
  <meta name="robots" content="noindex, follow" />
</head>
<body>
  <p>This page has moved. <a href="${to}">Continue to ${label}</a>.</p>
</body>
</html>
`
}

for (const { from, to } of LEGACY_REDIRECTS) {
  const slug = from.replace(/^\//, '')
  const html = legacyStub(from, to)
  written.push(writeFile(`${slug}.html`, html))
  written.push(writeFile(`${slug}/index.html`, html))
}

// --- sitemap -----------------------------------------------------------------
// Only the six real pages. Legacy stubs and 404.html are excluded by design.

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${absoluteUrl(r.path)}</loc>
    <lastmod>${lastModified(r)}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`
written.push(writeFile('sitemap.xml', sitemap))

written.push(
  writeFile(
    'robots.txt',
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  )
)

console.log(`prerendered ${ROUTES.length} routes -> ${written.length} files in dist/`)
for (const f of written) console.log(`  ${f}`)
