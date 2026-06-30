import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { personal } from '../data/personal'
import SEO from './SEO'

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let timeout

    const interval = setInterval(() => {
      setVisible(false)
      timeout = setTimeout(() => {
        setRoleIndex((index) => (index + 1) % personal.heroRoles.length)
        setVisible(true)
      }, 400)
    }, 2500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <SEO />

      <section id="hero" className="hero-section">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-eyebrow">{personal.location}</p>
          <h1 className="hero-title glow-text">{personal.title}</h1>
          <p className="hero-name">{personal.name}</p>
          <p className="hero-role">
            <span style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}>
              {personal.heroRoles[roleIndex]}
            </span>
          </p>
          <div className="hero-actions">
            <Link to="projects" smooth duration={500} offset={-80} className="cyber-button cyber-button--primary">
              View Projects
            </Link>
            <a href={personal.links.cv} target="_blank" rel="noreferrer" className="cyber-button">
              Download CV
            </a>
          </div>
        </div>
        <Link to="about" smooth duration={500} offset={-80} className="scroll-indicator" aria-label="Scroll to about">
          v
        </Link>
      </section>
    </>
  )
}
