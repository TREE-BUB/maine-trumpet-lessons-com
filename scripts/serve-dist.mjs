// Static server for dist/ that mirrors GitHub Pages' resolution rules, so
// `npm run preview` and the verification curls behave like production.
//
// Resolution order for a request path P:
//   1. P ends in "/"     -> P/index.html, else 404
//   2. exact file at P   -> serve it
//   3. P.html            -> serve it
//   4. P/index.html      -> 301 redirect to P/   (Pages adds the trailing slash)
//   5. otherwise         -> 404.html with a real 404 status

import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const port = Number(process.env.PORT || 4173)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
}

const isFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile()

function send(res, status, body, ext) {
  res.writeHead(status, {
    'Content-Type': TYPES[ext] ?? 'application/octet-stream',
    'Content-Length': body.length,
  })
  res.end(body)
}

function serve(res, filePath, status = 200) {
  send(res, status, fs.readFileSync(filePath), path.extname(filePath))
}

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)

    // Refuse to escape dist/.
    const resolved = path.join(dist, urlPath)
    if (!resolved.startsWith(dist)) {
      res.writeHead(403).end()
      return
    }

    if (urlPath.endsWith('/')) {
      const index = path.join(resolved, 'index.html')
      if (isFile(index)) return serve(res, index)
    } else {
      if (isFile(resolved)) return serve(res, resolved)
      if (isFile(`${resolved}.html`)) return serve(res, `${resolved}.html`)
      if (isFile(path.join(resolved, 'index.html'))) {
        res.writeHead(301, { Location: `${urlPath}/` }).end()
        return
      }
    }

    const notFound = path.join(dist, '404.html')
    if (isFile(notFound)) return serve(res, notFound, 404)
    send(res, 404, Buffer.from('Not Found'), '.txt')
  })
  .listen(port, () => {
    console.log(`serving dist/ (GitHub Pages semantics) on http://localhost:${port}`)
  })
