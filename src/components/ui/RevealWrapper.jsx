import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

export default function RevealWrapper({ children, delay = 0, style, className = '' }) {
  const ref = useRevealOnScroll()

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}
