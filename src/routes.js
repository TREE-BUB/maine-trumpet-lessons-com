// Single source of truth for routes and their metadata.
// Consumed by the app (nav, footer, SEO) and by the build-time prerender
// script (page emission, sitemap, legacy stubs).

export const SITE_URL = 'https://mainetrumpetlessons.com'
export const SITE_NAME = 'Maine Trumpet Lessons'
// Dedicated 1.91:1 crop. The source photo is square, which social cards
// centre-crop — that framing cuts the head off.
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const OG_IMAGE_WIDTH = '1200'
export const OG_IMAGE_HEIGHT = '630'

export const ROUTES = [
  {
    path: '/',
    label: 'Home',
    source: 'src/pages/Home.jsx',
    changefreq: 'monthly',
    priority: '1.0',
    title: 'Maine Trumpet Lessons — Private Trumpet Lessons in Portland, Maine',
    description:
      'Private, in-person trumpet lessons for beginners, comeback players, and advanced students of all ages in Deering Center, Portland, Maine. Taught with patience.',
  },
  {
    path: '/lessons',
    label: 'Lessons',
    source: 'src/pages/Lessons.jsx',
    changefreq: 'monthly',
    priority: '0.8',
    title: 'Teaching Philosophy | Portland ME | Maine Trumpet Lessons',
    description:
      'Trumpet lessons in Portland, Maine built on three pillars: developing technique, thinking musically, and thinking critically. Adapted to each student.',
  },
  {
    path: '/policies',
    label: 'Policies',
    source: 'src/pages/Policies.jsx',
    changefreq: 'yearly',
    priority: '0.5',
    title: 'Studio Policies | Portland ME | Maine Trumpet Lessons',
    description:
      'Studio policies for private trumpet lessons in Portland, Maine: practice expectations, required materials, billing and attendance, and terminating lessons.',
  },
  {
    path: '/pricing',
    label: 'Pricing',
    source: 'src/pages/Pricing.jsx',
    changefreq: 'monthly',
    priority: '0.8',
    title: 'Trumpet Lesson Rates | Portland ME | Maine Trumpet Lessons',
    description:
      '2026-2027 trumpet lesson rates in Portland, Maine: 30 minutes $40, 60 minutes $70. Prices are never raised on existing students. Discounts available.',
  },
  {
    path: '/about',
    label: 'About',
    source: 'src/pages/About.jsx',
    changefreq: 'monthly',
    priority: '0.7',
    title: 'Jimi Michel, Trumpet | Portland ME | Maine Trumpet Lessons',
    description:
      'Jimi Michel is a Maine-based trumpeter, educator, and musicologist. Former Principal Trumpet of the New York String Orchestra. Interlochen and NEC graduate.',
  },
  {
    path: '/contact',
    label: 'Contact',
    source: 'src/pages/Contact.jsx',
    changefreq: 'yearly',
    priority: '0.6',
    title: 'Book a Trumpet Lesson | Portland ME | Maine Trumpet Lessons',
    description:
      'Get in touch to schedule private trumpet lessons in Deering Center, Portland, Maine. Send a note through the form and expect a reply in a day or two.',
  },
]

// Links shown in the nav and footer, in order. Contact is rendered separately
// as a call-to-action button in both places.
export const NAV_ROUTES = ROUTES.filter((r) => r.path !== '/contact')

// URLs indexed from a previous version of the site. GitHub Pages cannot issue
// server-side 301s, so the build emits a canonical + meta-refresh stub at each.
export const LEGACY_REDIRECTS = [
  { from: '/teaching-philosophy', to: '/lessons' },
  { from: '/instruments', to: '/lessons' },
  { from: '/media', to: '/about' },
  { from: '/links', to: '/about' },
  { from: '/indirection', to: '/' },
]

export function routeFor(path) {
  return ROUTES.find((r) => r.path === path)
}

export function absoluteUrl(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}
