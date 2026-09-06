import { Helmet } from 'react-helmet-async'
import { SITE_NAME, OG_IMAGE, absoluteUrl, routeFor } from '../routes'

/**
 * Per-route <head>. Title and description come from the shared route manifest
 * so the prerender script, the sitemap and the running app can never drift.
 * Pass title/description explicitly only for pages outside the manifest
 * (e.g. the 404 page).
 */
export default function SEO({ path, title, description, jsonLd, noindex = false }) {
  const route = routeFor(path)
  const finalTitle = title ?? route?.title ?? SITE_NAME
  const finalDescription = description ?? route?.description ?? ''
  const url = absoluteUrl(path)

  return (
    <Helmet prioritizeSeoTags>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      {!noindex && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content="Jimi Michel playing the trumpet" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="Jimi Michel playing the trumpet" />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
