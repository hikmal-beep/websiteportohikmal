import { experiences } from '../data/experience'
import CyberTag from './ui/CyberTag'
import GlassCard from './ui/GlassCard'
import RevealWrapper from './ui/RevealWrapper'
import SectionHeader from './ui/SectionHeader'

function nodeStyle(current) {
  return {
    animation: current ? 'pulse-glow 2s infinite' : undefined,
  }
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-wrap">
      <div className="section-inner">
        <SectionHeader label="// 03. EXPERIENCE" headline="Where I've Worked." />
        <div className="timeline">
          {experiences.map((exp, index) => (
            <RevealWrapper key={exp.id} delay={index * 100} style={{ position: 'relative', marginBottom: '2rem' }}>
              <div className="timeline-node" style={nodeStyle(exp.current)} />
              <GlassCard>
                <div className="experience-head">
                  <div>
                    <p className="experience-role">{exp.role}</p>
                    <p className="experience-meta">
                      {exp.company} - {exp.location} - {exp.type}
                    </p>
                  </div>
                  <CyberTag label={exp.period} />
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
          ))}
        </div>
      </div>
    </section>
  )
}
