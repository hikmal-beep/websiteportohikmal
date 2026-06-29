import { personal } from '../data/personal'
import GlassCard from './ui/GlassCard'
import RevealWrapper from './ui/RevealWrapper'
import SectionHeader from './ui/SectionHeader'

function StatCard({ value, label }) {
  return (
    <GlassCard style={{ textAlign: 'center', padding: '1.5rem' }}>
      <p
        style={{
          fontFamily: 'Rajdhani',
          fontSize: '3rem',
          color: 'var(--cyan)',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          marginTop: '0.55rem',
        }}
      >
        {label}
      </p>
    </GlassCard>
  )
}

export default function AboutSection() {
  const { education } = personal

  return (
    <section id="about" className="section-wrap">
      <div className="section-inner">
        <RevealWrapper>
          <div className="about-grid">
            <div>
              <SectionHeader label="// 01. ABOUT" headline="Engineer. Builder. Problem Solver." />
              <div className="copy-stack">
                <p>{personal.summary}</p>
                <p>
                  Studied {education.degree} at {education.university}, {education.location}, with a GPA of{' '}
                  {education.gpa} during {education.period}.
                </p>
              </div>
              <div className="contact-row">
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
                <span>{personal.phone}</span>
                <a href={personal.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={personal.links.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
            <div className="stats-grid">
              {personal.stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
