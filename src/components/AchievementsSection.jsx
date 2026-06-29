import { Link } from 'react-router-dom'
import { certifications, featuredAchievement } from '../data/achievements'
import GlassCard from './ui/GlassCard'
import RevealWrapper from './ui/RevealWrapper'
import SectionHeader from './ui/SectionHeader'

export default function AchievementsSection() {
  const doubled = [...certifications, ...certifications]

  return (
    <section id="achievements" className="section-wrap">
      <div className="section-inner">
        <SectionHeader label="// 05. ACHIEVEMENTS" headline="Recognition & Certifications." />
        <RevealWrapper>
          <Link to="/achievements/featured" style={{ display: 'block', textDecoration: 'none' }}>
            <GlassCard className="achievement-card">
              <span className="achievement-icon">{featuredAchievement.icon}</span>
              <div>
                <p className="achievement-title">{featuredAchievement.title}</p>
                <p className="achievement-meta">
                  {featuredAchievement.issuer} - {featuredAchievement.date}
                </p>
                <p className="achievement-copy">{featuredAchievement.description}</p>
              </div>
              {featuredAchievement.link && (
                <a href={featuredAchievement.link} target="_blank" rel="noreferrer" className="achievement-link"
                  onClick={e => e.stopPropagation()}>
                  View
                </a>
              )}
            </GlassCard>
          </Link>
        </RevealWrapper>

        <div className="ticker-shell" aria-label="Certification ticker">
          <div className="ticker-track">
            {doubled.map((cert, index) => (
              <Link key={`${cert.id}-${index}`} to={`/achievements/${cert.id}`} style={{ display: 'block', textDecoration: 'none' }}>
                <div className="glass-card cert-card">
                  <span>{cert.name}</span>
                  <span>
                    {cert.issuer} - {cert.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
