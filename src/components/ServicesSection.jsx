import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { personal } from '../data/personal'
import GlassCard from './ui/GlassCard'
import RevealWrapper from './ui/RevealWrapper'
import SEO from './SEO'

export default function ServicesSection() {
  return (
    <>
      <SEO
        title="Freelance Services"
        description="AI development, full-stack web development, ERP systems, LLM & RAG solutions, and tech consulting — available for freelance projects."
        path="/services"
      />

      <section className="section-wrap" style={{ minHeight: '100vh', paddingTop: '6rem' }}>
        <div className="section-inner">
          <RevealWrapper>
            <div className="section-header">
              <p className="section-label">{'// 00. SERVICES'}</p>
              <h1 className="section-title">What I Can Build For You</h1>
              <p className="section-subtitle" style={{ marginTop: '1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                Available for freelance projects and collaborations. Let's turn your idea into reality.
              </p>
            </div>
          </RevealWrapper>

          <div className="services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}>
            {services.map((service, index) => (
              <RevealWrapper key={service.id}>
                <GlassCard style={{
                  padding: '2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.75rem',
                      color: 'var(--cyan)',
                      opacity: 0.6,
                    }}>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h2 style={{
                      fontSize: '1.25rem',
                      marginTop: '0.5rem',
                      color: 'var(--foreground)',
                    }}>
                      {service.title}
                    </h2>
                  </div>

                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.7',
                    color: 'var(--text-muted)',
                    marginBottom: '1.5rem',
                    flex: 1,
                  }}>
                    {service.description}
                  </p>

                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    marginBottom: '1.5rem',
                  }}>
                    {service.features.map((feature) => (
                      <li key={feature} style={{
                        display: 'flex',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        padding: '0.25rem 0',
                      }}>
                        <span style={{ color: 'var(--cyan)' }}>&gt;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.85rem',
                      color: 'var(--cyan)',
                    }}>
                      {service.price}
                    </span>
                    <a
                      href={`mailto:${personal.email}?subject=Freelance%20Project%3A%20${encodeURIComponent(service.title)}`}
                      className="cyber-button"
                    >
                      Hire Me
                    </a>
                  </div>
                </GlassCard>
              </RevealWrapper>
            ))}
          </div>

          <RevealWrapper>
            <GlassCard style={{
              marginTop: '3rem',
              padding: '2.5rem',
              textAlign: 'center',
            }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                Not sure what you need?
              </h2>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
                lineHeight: '1.7',
              }}>
                Send me a message and I'll help you figure out the best approach for your project.
              </p>
              <a
                href={`mailto:${personal.email}?subject=Freelance%20Inquiry`}
                className="cyber-button cyber-button--primary"
              >
                Let's Talk
              </a>
            </GlassCard>
          </RevealWrapper>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/" className="cyber-button">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
