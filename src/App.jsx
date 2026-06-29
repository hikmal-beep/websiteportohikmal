import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
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

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <VideoBackground />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>
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
        </main>
        <FooterSection />
      </div>
    </ChakraProvider>
  )
}

export default App
