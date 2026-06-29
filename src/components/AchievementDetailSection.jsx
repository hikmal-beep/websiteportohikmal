import { useParams, Link } from 'react-router-dom'
import { certifications, featuredAchievement } from '../data/achievements'
import GlassCard from './ui/GlassCard'
import RevealWrapper from './ui/RevealWrapper'

export default function AchievementDetailSection() {
  const { id } = useParams()

  const achievement = id === 'featured'
    ? { id: 'featured', ...featuredAchievement }
    : certifications.find(a => a.id === id)

  if (!achievement) {
    return (
      <div className="section-wrap">
        <div className="section-inner section-inner--narrow">
          <GlassCard style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Achievement not found.
            </p>
            <Link to="/" state={{ section: 'achievements' }} className="cyber-button cyber-button--primary">
              Back to Portfolio
            </Link>
          </GlassCard>
        </div>
      </div>
    )
  }

  return (
    <div className="section-wrap" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="section-inner section-inner--narrow" style={{ width: '100%' }}>
        <RevealWrapper>
          <GlassCard style={{ padding: '2.5rem' }}>
            <div className="achievement-card" style={{ padding: 0, animation: 'none', gap: '2rem' }}>
              {achievement.icon && (
                <span className="achievement-icon" style={{ flexShrink: 0 }}>
                  {achievement.icon}
                </span>
              )}
              <div style={{ flex: 1 }}>
                <p className="achievement-title">{achievement.title}</p>
                <p className="achievement-meta">
                  {achievement.issuer}{achievement.date ? ` — ${achievement.date}` : ''}
                </p>
                {achievement.description && (
                  <p className="achievement-copy">{achievement.description}</p>
                )}
                {achievement.link && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <a href={achievement.link} target="_blank" rel="noreferrer" className="cyber-button">
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </RevealWrapper>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" state={{ section: 'achievements' }} className="cyber-button cyber-button--primary">
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}