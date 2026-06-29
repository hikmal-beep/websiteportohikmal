import { useRef, useEffect, useState } from 'react'

export default function VideoBackground() {
  const videoRef = useRef()
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)
  const interactedRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let retryTimeout
    let cancelled = false

    const playVideo = () => {
      if (cancelled) return
      video.play()
        .then(() => {
          interactedRef.current = true
          setReady(true)
        })
        .catch(() => {
          if (!interactedRef.current && !cancelled) {
            retryTimeout = setTimeout(playVideo, 300)
          }
        })
    }

    const handleCanPlay = () => {
      setLoading(false)
      playVideo()
    }

    const handleUserInteraction = () => {
      if (!interactedRef.current) {
        interactedRef.current = true
        playVideo()
      }
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', () => setLoading(false))

    const readyTimeout = setTimeout(() => {
      if (!cancelled) playVideo()
    }, 500)

    document.addEventListener('click', handleUserInteraction, { once: true })
    document.addEventListener('touchstart', handleUserInteraction, { once: true })

    return () => {
      cancelled = true
      clearTimeout(retryTimeout)
      clearTimeout(readyTimeout)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', () => setLoading(false))
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [])

  return (
    <div className="video-background-container">
      {loading && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'grid', placeItems: 'center',
          color: 'var(--cyan-dim)', fontFamily: 'JetBrains Mono', fontSize: '0.75rem',
          opacity: 0.5,
        }}>
          Loading...
        </div>
      )}
      <video
        ref={videoRef}
        className={`video-background ${ready ? 'video-background--ready' : ''}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/Organic_Lines_4K_Motion_Background_Loop.mp4" type="video/mp4" />
      </video>
    </div>
  )
}