import { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-scroll'
import { personal } from '../data/personal'

const NAV_LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Achievements', to: 'achievements' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const lastScrollY = useRef(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    if (Math.abs(currentScrollY - lastScrollY.current) > 50) {
      setScrolled(currentScrollY > 50)
      lastScrollY.current = currentScrollY
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      lastScrollY.current = window.scrollY
      setScrolled(window.scrollY > 50)
    }, 100)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeout)
    }
  }, [handleScroll])

  const closeMenu = useCallback(() => setOpen(false), [])

  return (
    <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <nav className="site-nav__inner" aria-label="Primary navigation">
        <Link to="hero" smooth duration={300} offset={-80} className="site-logo" onClick={closeMenu}>
          {personal.handle}
          <span className="cursor">_</span>
        </Link>

        <div className="site-nav__links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={300}
              offset={-80}
              className="nav-link"
              activeClass="nav-link--active"
              spy
            >
              {link.label}
            </Link>
          ))}
          <a className="nav-link nav-link--external" href={personal.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>

        <button
          type="button"
          className="hamburger"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-drawer ${open ? 'mobile-drawer--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            smooth
            duration={300}
            offset={-80}
            className="mobile-link"
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
        <div className="mobile-socials">
          <a href={personal.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={personal.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
