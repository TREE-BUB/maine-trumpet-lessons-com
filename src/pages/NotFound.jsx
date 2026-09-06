import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <div className="page">
      <SEO
        path="/404"
        title="Page not found | Maine Trumpet Lessons"
        description="That page doesn't exist. Head back to the homepage or get in touch about private trumpet lessons in Deering Center, Portland, Maine."
        noindex
      />
      <section className="section-sm" style={{ paddingTop: 72, paddingBottom: 110 }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div className="eyebrow eyebrow-lg">404</div>
          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', marginTop: 20 }}>Page not found.</h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 560 }}>
            That page doesn't exist — it may have moved or the link may be out of date. Everything on the site is one click away below.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
            <Link className="btn btn-accent btn-lg" to="/">Back to home</Link>
            <Link className="btn btn-ghost btn-lg" to="/contact">Get in touch</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
