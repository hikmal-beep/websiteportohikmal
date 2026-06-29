import { useEffect, useRef, useState } from 'react'

export default function VideoBackground() {
  const videoRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(query.matches)

    updatePreference()
    query.addEventListener('change', updatePreference)

    return () => query.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || videoError) return undefined

    const markReady = () => {
      setIsReady(true)
      if (reducedMotion) {
        video.pause()
        return
      }

      video.play().catch(() => {
        // Muted autoplay usually succeeds; this keeps the first frame visible if it does not.
        setIsReady(true)
      })
    }

    const handleVideoError = () => {
      setVideoError(true)
    }

    const retryPlay = () => {
      if (!reducedMotion) {
        video.play().catch(() => undefined)
      }
      document.removeEventListener('pointerdown', retryPlay)
    }

    video.addEventListener('canplay', markReady)
    video.addEventListener('error', handleVideoError)
    document.addEventListener('pointerdown', retryPlay, { once: true })

    if (video.readyState >= 3) {
      markReady()
    }

    return () => {
      video.removeEventListener('canplay', markReady)
      video.removeEventListener('error', handleVideoError)
      document.removeEventListener('pointerdown', retryPlay)
    }
  }, [reducedMotion, videoError])

  if (videoError) {
    return null
  }

  return (
    <div className="video-background-container">
      <video
        ref={videoRef}
        className={`video-background ${isReady ? 'video-background--ready' : ''}`}
        autoPlay={!reducedMotion}
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/Organic_Lines_4K_Motion_Background_Loop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
