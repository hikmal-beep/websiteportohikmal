import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GamePage() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#1d2931'
    }}>
      <iframe
        src="/game/index.html"
        title="Mini RPG"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
      />
    </div>
  )
}
