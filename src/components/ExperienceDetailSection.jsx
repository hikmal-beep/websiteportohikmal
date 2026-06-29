import { useParams, Link } from 'react-router-dom'
import { experiences } from '../data/experience'
import GlassCard from './ui/GlassCard'
import CyberTag from './ui/CyberTag'
import RevealWrapper from './ui/RevealWrapper'

export default function ExperienceDetailSection() {
  const { id } = useParams()
  const exp = experiences.find(e => e.id === id)

  if (!exp) {
    return (
      <div className="section-wrap">
        <div className="section-inner section-inner--narrow">
          <GlassCard style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Experience not found.
            </p>
            <Link to="/" state={{ section: 'experience' }} className="cyber-button cyber-button--primary">
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
          <GlassCard style={{ padding: '2rem' }}>
            <div className="experience-head" style={{ marginBottom: '1rem' }}>
              <div>
                <p className="experience-role" style={{ fontSize: '1.5rem' }}>{exp.role}</p>
                <p className="experience-meta" style={{ fontSize: '0.95rem', marginTop: '0.3rem' }}>
                  {exp.company} — {exp.location}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <CyberTag label={exp.type} />
                <CyberTag label={exp.period} />
                {exp.current && <CyberTag label="Current" />}
              </div>
            </div>

            <ul className="bullet-list">
              {exp.bullets.map((bullet) => (
                <li key={bullet}>
                  <span aria-hidden="true">::</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </RevealWrapper>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" state={{ section: 'experience' }} className="cyber-button cyber-button--primary">
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}