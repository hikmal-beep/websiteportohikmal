import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import GlassCard from './ui/GlassCard'
import CyberTag from './ui/CyberTag'
import RevealWrapper from './ui/RevealWrapper'

export default function ProjectDetailSection() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="section-wrap">
        <div className="section-inner section-inner--narrow">
          <GlassCard style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Project not found.
            </p>
            <Link to="/" state={{ section: 'projects' }} className="cyber-button cyber-button--primary">
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
          <GlassCard style={{ overflow: 'hidden', padding: 0 }}>
            <div className="project-accent" />
            <div className="project-body" style={{ padding: '2rem' }}>
              <div className="project-head" style={{ marginBottom: '0.5rem' }}>
                <p className="project-title" style={{ fontSize: '1.5rem' }}>{project.title}</p>
                <span className="project-year">{project.year}</span>
              </div>

              <p className="project-description" style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
                {project.description}
              </p>

              <div style={{ marginTop: '0.5rem' }}>
                <p style={{
                  fontFamily: 'JetBrains Mono', fontSize: '0.75rem',
                  color: 'var(--cyan)', marginBottom: '0.75rem', opacity: 0.8
                }}>
                  {project.highlight}
                </p>
              </div>

              <div className="tag-list" style={{ marginTop: '0.5rem' }}>
                {project.tags.map((tag) => (
                  <CyberTag key={tag} label={tag} />
                ))}
              </div>

              {project.link && (
                <div className="project-foot" style={{ marginTop: '1.5rem' }}>
                  <a href={project.link} target="_blank" rel="noreferrer" className="cyber-button">
                    Open Project
                  </a>
                </div>
              )}
            </div>
          </GlassCard>
        </RevealWrapper>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" state={{ section: 'projects' }} className="cyber-button cyber-button--primary">
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}