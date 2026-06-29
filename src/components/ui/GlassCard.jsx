export default function GlassCard({ children, style, className = '', onClick }) {
  return (
    <div
      className={`glass-card ${className}`}
      style={{ padding: '1.25rem 1.5rem', ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
