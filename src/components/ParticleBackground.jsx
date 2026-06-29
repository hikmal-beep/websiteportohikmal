import { useCallback, useMemo } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
  const init = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const options = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, area: 900 } },
        color: { value: '#00F5FF' },
        opacity: { value: 0.15 },
        size: { value: { min: 1, max: 2.5 } },
        links: {
          enable: true,
          color: '#00F5FF',
          opacity: 0.07,
          distance: 140,
          width: 1,
        },
        move: { enable: true, speed: 0.4, outModes: 'bounce' },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          repulse: { distance: 80, duration: 0.4 },
          push: { quantity: 4 },
        },
      },
      detectRetina: true,
    }),
    [],
  )

  return (
    <ParticlesProvider init={init}>
      <Particles
        id="tsparticles"
        options={options}
        style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      />
    </ParticlesProvider>
  )
}
