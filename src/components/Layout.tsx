import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { addressLines, hours, phoneDisplay, phoneHref, tagline } from '../data/services'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <NavLink className="brand" to="/" end>
          <span className="brand-mark">
            <img src="/logo.png" alt="" />
          </span>
          <span className="brand-name">SpeedyFix</span>
        </NavLink>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav
          id="primary-nav"
          className={menuOpen ? 'nav-links open' : 'nav-links'}
          aria-label="Primary"
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink className="nav-cta" to="/quote">
            Get a quote
          </NavLink>
        </nav>
      </header>
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <p className="tagline">{tagline}</p>
            <p className="muted">Nairobi auto garage</p>
          </div>
          <div>
            <p className="footer-label">Workshop</p>
            <ul className="address-list">
              {addressLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p>
              <a className="phone-link" href={phoneHref}>
                {phoneDisplay}
              </a>
            </p>
          </div>
          <div>
            <p className="footer-label">Hours</p>
            <ul className="hours-list">
              {hours.map((row) => (
                <li key={row.days}>
                  <span>{row.days}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}
