import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

/**
 * Renders one route to static HTML at build time. Returns the markup for
 * #root plus the <head> tags collected from react-helmet-async.
 */
export function render(url) {
  const helmetContext = {}

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  )

  const { helmet } = helmetContext
  // `prioritizeSeoTags` moves title/description/canonical/og into
  // helmet.priority; without it those tags are silently dropped here.
  const head = [
    helmet.title,
    helmet.priority,
    helmet.meta,
    helmet.link,
    helmet.script,
  ]
    .map((tag) => tag.toString())
    .filter(Boolean)
    .join('\n    ')

  return { html, head }
}
