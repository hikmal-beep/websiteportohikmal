import { useEffect } from 'react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import VideoBackground from './components/VideoBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import AchievementsSection from './components/AchievementsSection'
import FooterSection from './components/FooterSection'
import ScanLine from './components/ui/ScanLine'
import ExperienceDetailSection from './components/ExperienceDetailSection'
import ProjectDetailSection from './components/ProjectDetailSection'
import AchievementDetailSection from './components/AchievementDetailSection'
import ServicesSection from './components/ServicesSection'
import GamePage from './components/GamePage'
import './index.css'

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const section = location.state?.section
    if (section) {
      requestAnimationFrame(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [location.state?.section])

  return (
    <>
      <HeroSection />
      <ScanLine />
      <AboutSection />
      <ScanLine />
      <SkillsSection />
      <ScanLine />
      <ExperienceSection />
      <ScanLine />
      <ProjectsSection />
      <ScanLine />
      <AchievementsSection />
    </>
  )
}

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ChakraProvider>
  )
}

function AppContent() {
  const location = useLocation()
  const isGameRoute = location.pathname === '/game'

  if (isGameRoute) {
    return <GamePage />
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <VideoBackground />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience/:id" element={<ExperienceDetailSection />} />
          <Route path="/projects/:id" element={<ProjectDetailSection />} />
          <Route path="/achievements/:id" element={<AchievementDetailSection />} />
          <Route path="/services" element={<ServicesSection />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <FooterSection />
    </div>
  )
}

export default App
