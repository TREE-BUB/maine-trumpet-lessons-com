import { Link } from 'react-router-dom'
import { NAV_ROUTES } from '../routes'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col">
            <Link
              to="/"
              style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.015em', textTransform: 'uppercase', color: 'var(--paper)', cursor: 'pointer', padding: 0 }}
            >
              Maine Trumpet Lessons
            </Link>
            <p style={{ color: 'color-mix(in srgb, var(--paper) 70%, transparent)', marginTop: 18, maxWidth: 320, lineHeight: 1.6, fontSize: '0.95rem' }}>
              Private, in-person trumpet lessons for comeback players, beginners, intermediate, and advanced students of all ages, taught with patience in Deering Center.
            </p>
            <Link
              to="/contact"
              className="btn btn-accent"
              style={{ marginTop: 22 }}
            >
              Get more info or schedule your first lesson
            </Link>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            {NAV_ROUTES.map((p) => (
              <Link key={p.path} to={p.path}>{p.label}</Link>
            ))}
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="made-love">Made with <b>♥</b> in Deering Center, Portland</span>
          <span>© {new Date().getFullYear()} Maine Trumpet Lessons</span>
        </div>
      </div>
    </footer>
  )
}
