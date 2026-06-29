import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import CyberTag from './ui/CyberTag'
import GlassCard from './ui/GlassCard'
import RevealWrapper from './ui/RevealWrapper'
import SectionHeader from './ui/SectionHeader'

function ProjectCard({ project, featuredLead }) {
  return (
    <Link to={`/projects/${project.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <GlassCard
        className={featuredLead ? 'project-card project-card--wide' : 'project-card'}
        style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: 0 }}
      >
        <div className="project-accent" />
        <div className="project-body">
          <div className="project-head">
            <p className="project-title">{project.title}</p>
            <span className="project-year">{project.year}</span>
          </div>
          <p className="project-description">{project.description}</p>
          <div className="tag-list">
            {project.tags.map((tag) => (
              <CyberTag key={tag} label={tag} />
            ))}
          </div>
          <div className="project-foot">
            <span>{project.highlight}</span>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}
                onClick={e => e.stopPropagation()}>
                Open
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}

export default function ProjectsSection() {
  let firstFeaturedRendered = false

  return (
    <section id="projects" className="section-wrap">
      <div className="section-inner">
        <SectionHeader label="// 04. PROJECTS" headline="Things I've Built." />
        <div className="project-grid">
          {projects.map((project, index) => {
            const featuredLead = project.featured && !firstFeaturedRendered
            if (featuredLead) firstFeaturedRendered = true

            return (
              <RevealWrapper
                key={project.id}
                delay={index * 80}
                className={featuredLead ? 'project-item--wide' : ''}
              >
                <ProjectCard project={project} featuredLead={featuredLead} />
              </RevealWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
