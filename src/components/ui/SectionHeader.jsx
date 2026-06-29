export default function SectionHeader({ label, headline, align = 'left' }) {
  return (
    <div style={{ textAlign: align, marginBottom: '2.5rem' }}>
      <p
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.8rem',
          color: 'var(--cyan-dim)',
          letterSpacing: '0.2em',
          marginBottom: '0.5rem',
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: 'Rajdhani',
          fontWeight: 700,
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: 'var(--text-primary)',
          lineHeight: 1.15,
        }}
      >
        {headline}
      </h2>
    </div>
  )
}
