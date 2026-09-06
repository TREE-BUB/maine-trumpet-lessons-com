import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_ROUTES } from '../routes'

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link className="wordmark" to="/" onClick={close}>
          Maine Trumpet Lessons
          <small>Deering Center, Portland</small>
        </Link>

        <div className="nav-links">
          {NAV_ROUTES.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className={'nav-link' + (pathname === p.path ? ' active' : '')}
              onClick={close}
            >
              {p.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn btn-accent nav-cta nav-cta-desktop"
            onClick={close}
          >
            CONTACT
          </Link>
        </div>

        <button
          className={'nav-hamburger' + (open ? ' open' : '')}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {NAV_ROUTES.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className={'mobile-link' + (pathname === p.path ? ' active' : '')}
              onClick={close}
            >
              {p.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn btn-accent"
            style={{ margin: '6px 22px 10px', width: 'calc(100% - 44px)' }}
            onClick={close}
          >
            CONTACT
          </Link>
        </div>
      )}
    </nav>
  )
}
