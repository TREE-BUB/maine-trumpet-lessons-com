# mainetrumpetlessons.com

Marketing site for **Maine Trumpet Lessons** — private, in-person trumpet lessons
taught by Jimi Michel in the Deering Center neighborhood of Portland, Maine.

Vite + React, statically prerendered, deployed to GitHub Pages on the apex domain
`mainetrumpetlessons.com`.

## Why it's prerendered

GitHub Pages serves static files and has no SPA fallback. A plain Vite SPA build
emits one `index.html`, so every route except `/` returns a genuine HTTP 404 —
invisible to visitors if you redirect around it in JavaScript, fatal for search
engines, which will not index a URL that answers 404.

So the build renders each route to a real file at build time. The HTML a crawler
receives already contains the page's copy and its `<head>`; React hydrates on top
of it for client-side navigation.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server. No prerendering — Helmet fills `<head>` client-side. |
| `npm run build` | Full production build: client bundle → SSR bundle → prerender. |
| `npm run preview` | Serves `dist/` with GitHub Pages resolution semantics (see below). |

`npm run build` is three stages, and all three must run:

1. `build:client` — `vite build` → `dist/` (hashed JS/CSS, `index.html` template, `assets/` copied in)
2. `build:ssr` — `vite build --ssr src/entry-server.jsx` → `.ssr/` (gitignored, build-time only)
3. `prerender` — `node scripts/prerender.mjs` → writes every page, the sitemap, and the stubs

## How the prerender works

`src/entry-server.jsx` renders one route with `renderToString` + `StaticRouter`,
and collects the `<head>` from react-helmet-async.

> **Gotcha:** `SEO.jsx` uses Helmet's `prioritizeSeoTags`, which moves title,
> description, canonical and Open Graph into `helmet.priority` — *not*
> `helmet.meta` / `helmet.link`. Omit `helmet.priority` when assembling the head
> and those tags vanish silently.

`scripts/prerender.mjs` substitutes the result into the `<!--app-head-->` and
`<!--app-html-->` markers in `index.html`.

> **Gotcha:** the substitutions use *function* replacers. `String.replace`
> interprets `$$`, `$&`, `` $` `` and `$'` in a replacement string — a plain
> string replacement silently turns the JSON-LD `priceRange: "$$"` into `"$"`.

Each route is written **twice** — `lessons.html` and `lessons/index.html`.
GitHub Pages tries `<path>.html` before `<path>/index.html`, so `/lessons`
answers 200 directly instead of 301-ing to `/lessons/`, which keeps the
self-referencing canonical off a redirect.

## Adding or changing a page

`src/routes.js` is the single source of truth. The app, the prerender step and
`sitemap.xml` all read from it — they cannot drift.

To add a route:

1. Add an entry to `ROUTES` in `src/routes.js` (path, label, source, title, description, changefreq, priority).
2. Create the page component and render `<SEO path="/your-path" />` inside it.
3. Register it in `src/App.jsx`, above the `path="*"` catch-all.

It is then automatically prerendered, linked from the nav and footer (unless you
exclude it from `NAV_ROUTES`), and listed in the sitemap.

To change a title or description, edit `src/routes.js` only. Titles follow
`Primary Keyword | Location | Maine Trumpet Lessons`, under 60 characters;
descriptions run 140–160 characters. The homepage title is deliberately longer
and is left as-is.

## Links must have real `href`s

Every internal link uses react-router's `<Link>`, which renders a real
`<a href>`. **Do not navigate with `useNavigate()` in an `onClick` on a bare
`<a>` or `<button>`.** Crawlers follow `href` attributes; a JS click handler is
invisible to them, and middle-click and cmd-click stop working for everyone else.

Buttons that navigate are `<a className="btn …">`. Two CSS rules in
`index.css` exist only to support that — `.footer a` and `.footer-col a` are more
specific than `.btn` and would otherwise override its layout and text colour.

## Legacy URLs

`LEGACY_REDIRECTS` in `src/routes.js` lists paths still in Google's index from a
previous version of the site. GitHub Pages cannot issue a server-side 301, so the
build emits a stub at each: a `<link rel="canonical">` to the closest live page, a
`meta refresh`, and a visible fallback link. Weaker than a 301, but it preserves
the signal and removes the dead end. Stubs are excluded from the sitemap and
marked `noindex`.

## 404

`404.html` is the app's catch-all route, prerendered. GitHub Pages serves it with
a real 404 status — the correct answer for a URL that does not exist. Do not
reintroduce a `sessionStorage` redirect to `/`; it converts real 404s into soft
redirects and is precisely what broke indexing before.

## Deployment

`.github/workflows/deploy.yml` runs on **push to `main`** and publishes `dist/`
via `actions/deploy-pages`. Pushing a feature branch does not deploy.

`fetch-depth: 0` on the checkout is required — `scripts/prerender.mjs` reads each
page's last-commit date for `<lastmod>`, and a shallow clone has no such history.

`assets/` is the Vite `publicDir` (not `public/` — that directory does not exist,
and a file placed there is silently never copied). `assets/CNAME` is what holds
the custom domain.

## Verifying a deploy

```bash
for p in / /lessons /pricing /about /policies /contact; do
  printf '%-11s ' "$p"
  curl -sI "https://mainetrumpetlessons.com$p" | head -1
done
```

All six must return 200. Then `/asdf` must return 404, and
`/teaching-philosophy` must return 200 (the stub). `npm run preview` reproduces
the same resolution rules locally on port 4173.

## Contact form

The contact form posts to [Formspree](https://formspree.io) (form ID in
`src/pages/Contact.jsx`). No backend.

## Layout

```
assets/            Vite publicDir — images, favicon, CNAME
scripts/
  prerender.mjs    build-time SSG: pages, sitemap, legacy stubs, 404
  serve-dist.mjs   local server mirroring GitHub Pages resolution
src/
  routes.js        route manifest — titles, descriptions, legacy redirects
  entry-server.jsx SSR entry used by the prerender step
  main.jsx         client entry (hydrateRoot)
  App.jsx          router
  components/      Nav, Footer, CTABand, SEO
  pages/           Home, Lessons, Policies, Pricing, About, Contact, NotFound
  index.css        design tokens + all styles
```

The design tokens (colors, type scale, spacing, button styles) live in
`:root` at the top of `src/index.css`.

## Known gaps

- The homepage `Person` / `LocalBusiness` JSON-LD has no `sameAs` links, because
  there are no confirmed social profiles for the studio.
- `app.jsx`, `pages.jsx` and `tweaks-panel.jsx` in the repo root are leftovers
  from the original design prototype. Nothing imports them.
