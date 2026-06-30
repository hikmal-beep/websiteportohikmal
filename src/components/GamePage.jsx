import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const GAME_SCRIPTS = [
  'Input.js',
  'Collision.js',
  'Camera.js',
  'Dialog.js',
  'NPC.js',
  'Player.js',
  'World.js',
  'Game.js'
]

export default function GamePage() {
  const navigate = useNavigate()
  const gameRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        gameRef.current?.destroy()
        gameRef.current = null
        navigate('/')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/game/style.css'
    document.head.appendChild(link)

    const scripts = []
    let idx = 0

    function loadNext() {
      if (idx >= GAME_SCRIPTS.length) {
        try {
          const game = new Game()
          game.start()
          gameRef.current = game
        } catch (err) {
          console.error('Game init failed:', err)
        }
        return
      }

      const s = document.createElement('script')
      s.src = `/game/js/${GAME_SCRIPTS[idx]}`
      scripts.push(s)
      s.onload = () => { idx++; loadNext() }
      s.onerror = () => { idx++; loadNext() }
      document.body.appendChild(s)
    }

    loadNext()

    return () => {
      link.remove()
      scripts.forEach((s) => s.remove())

      if (gameRef.current) {
        gameRef.current.destroy()
        gameRef.current = null
      }
    }
  }, [])

  return (
    <div id="game-shell" style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      <canvas id="game" width="960" height="540" aria-label="Mini RPG exploration demo" />
      <div id="dialog" className="dialog hidden">
        <div id="dialog-name" className="dialog-name" />
        <div id="dialog-text" className="dialog-text" />
        <div className="dialog-next">[F] Next</div>
      </div>

      <div id="mobile-controls">
        <div id="joystick-zone">
          <div id="joystick-base">
            <div id="joystick-knob" />
          </div>
        </div>
        <button id="talk-btn" className="ctrl-btn action-btn" data-key="f" aria-label="Talk">Talk</button>
      </div>
    </div>
  )
}
