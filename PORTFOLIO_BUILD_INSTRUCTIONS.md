# Muhammad Hikmal Akbar — Portfolio Website: AI Agent Build Instructions

## Overview

Build a **single-page portfolio website** for Muhammad Hikmal Akbar, a Full-Stack & AI Systems Developer. The visual style is inspired by HoYoverse game sites (Honkai: Star Rail, Snowbreak) — cinematic dark aesthetic, glowing cyan/blue accents, card-based content reveals, smooth scroll animations, and particle effects.

**Architecture principle:** Every piece of content lives in `src/data/`. Components are purely presentational — they receive data as props and render it. To update any content, only the data files need to change.

**Stack:** React + Vite, Chakra UI, Tailwind CSS

---

## 1. Project Setup

```bash
npm create vite@latest hikmal-portfolio -- --template react
cd hikmal-portfolio
npm install
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
npm install tailwindcss @tailwindcss/vite
npm install react-scroll react-intersection-observer tsparticles @tsparticles/react @tsparticles/slim
```

### `tailwind.config.js`
```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyan: { DEFAULT: '#00F5FF', dim: '#00C8D4' },
        navy: { DEFAULT: '#050B18', mid: '#0A1628', surface: '#0D1F3C' },
      },
      fontFamily: {
        display: ['"Rajdhani"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### `src/index.css` — Global CSS Tokens & Animations
```css
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --cyan:         #00F5FF;
  --cyan-dim:     #00C8D4;
  --cyan-glow:    rgba(0, 245, 255, 0.15);
  --navy:         #050B18;
  --navy-mid:     #0A1628;
  --navy-surface: #0D1F3C;
  --glass-bg:     rgba(13, 31, 60, 0.55);
  --glass-border: rgba(0, 245, 255, 0.18);
  --text-primary: #E8F4F8;
  --text-muted:   #7A9BB5;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background-color: var(--navy);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

.glow-cyan { box-shadow: 0 0 20px var(--cyan-glow), 0 0 60px var(--cyan-glow); }
.glow-text  { text-shadow: 0 0 20px var(--cyan), 0 0 40px rgba(0,245,255,0.4); }

.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 12px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.glass-card:hover {
  border-color: var(--cyan);
  box-shadow: 0 0 30px var(--cyan-glow);
}

.scan-line {
  width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyan), transparent);
  opacity: 0.4;
}

.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }

.tag-cyber {
  border: 1px solid var(--cyan-dim);
  color: var(--cyan);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  padding: 3px 10px;
  border-radius: 3px;
  letter-spacing: 0.05em;
  background: rgba(0, 245, 255, 0.06);
  transition: background 0.2s, box-shadow 0.2s;
}
.tag-cyber:hover {
  background: rgba(0, 245, 255, 0.14);
  box-shadow: 0 0 8px var(--cyan-glow);
  transform: scale(1.05);
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--navy); }
::-webkit-scrollbar-thumb { background: var(--cyan-dim); border-radius: 3px; }

@keyframes float        { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-10px)} }
@keyframes pulse-glow   { 0%,100%{box-shadow:0 0 10px var(--cyan-glow)} 50%{box-shadow:0 0 30px var(--cyan-glow),0 0 60px var(--cyan-glow)} }
@keyframes typing-cursor{ 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes ticker       { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

.ticker-track { display:flex; animation:ticker 30s linear infinite; gap:1rem; }
.ticker-track:hover { animation-play-state:paused; }

@media (prefers-reduced-motion: reduce) {
  *, .ticker-track { animation: none !important; transition: none !important; }
}
```

---

## 2. Full File & Folder Structure

```
src/
├── App.jsx
├── index.css
│
├── data/                          ← ALL CONTENT LIVES HERE
│   ├── personal.js
│   ├── skills.js
│   ├── experience.js
│   ├── projects.js
│   └── achievements.js
│
├── components/
│   ├── ui/                        ← Reusable primitive components
│   │   ├── SectionHeader.jsx      ← label + headline, used by every section
│   │   ├── GlassCard.jsx          ← glass-card wrapper
│   │   ├── CyberTag.jsx           ← .tag-cyber span
│   │   ├── ScanLine.jsx           ← divider
│   │   └── RevealWrapper.jsx      ← scroll-reveal container
│   │
│   ├── ParticleBackground.jsx
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── AboutSection.jsx
│   ├── SkillsSection.jsx
│   ├── ExperienceSection.jsx
│   ├── ProjectsSection.jsx
│   ├── AchievementsSection.jsx
│   └── FooterSection.jsx
│
└── hooks/
    └── useRevealOnScroll.js
```

---

## 3. Data Files (the single source of truth)

### `src/data/personal.js`
```js
export const personal = {
  name:     'Muhammad Hikmal Akbar',
  handle:   'HIKMAL.DEV',
  title:    'Full-Stack Developer | AI System Developer',
  location: 'Bogor, Indonesia',
  email:    'hikmal.work@gmail.com',
  phone:    '+62 822 8177 4943',
  links: {
    linkedin:  'https://www.linkedin.com/in/muhammad-hikmal-akbar/',
    github:    'https://github.com/hikmal-beep',
    portfolio: 'https://intip.in/PortfolioHikmal',
  },
  education: {
    degree:     'Bachelor of Computer Engineering',
    university: 'Institut Teknologi Sepuluh Nopember',
    location:   'Surabaya, Indonesia',
    gpa:        '3.45 / 4.00',
    period:     'August 2021 – August 2025',
  },
  summary:
    'AI Systems Developer and Full-Stack Developer specializing in building intelligent ' +
    'software systems that integrate machine learning with scalable applications.',
  heroRoles: [
    'Building Intelligent Systems',
    'LLM & RAG Architect',
    'Computer Vision Engineer',
    'Full-Stack Engineer',
    'AI-Powered Product Builder',
  ],
  stats: [
    { value: '3.45', label: 'GPA · ITS Surabaya' },
    { value: '6+',   label: 'Projects Shipped' },
    { value: 'Top 50', label: 'Bangkit 2024' },
    { value: '2 yrs', label: 'Industry Experience' },
  ],
  footerNote: 'Built with React · Vite · Chakra UI · Tailwind',
}
```

---

### `src/data/skills.js`
```js
// Each category has an id (for keys), a label (display name), and a list of skill strings.
export const skillCategories = [
  {
    id: 'languages',
    label: 'Languages',
    skills: ['Python', 'SQL', 'JavaScript', 'Go', 'C/C++', 'HTML', 'CSS'],
  },
  {
    id: 'ml-ai',
    label: 'ML & AI',
    skills: [
      'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV',
      'YOLO', 'LangChain', 'RAG', 'LLM Fine-Tuning',
      'Computer Vision', 'NLP',
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: ['Go Fiber', 'FastAPI', 'REST APIs', 'GORM', 'Clean Architecture'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['React.js', 'Vite', 'Chakra UI', 'Tailwind CSS'],
  },
  {
    id: 'database',
    label: 'Database',
    skills: ['PostgreSQL', 'Relational DB Design', 'Data Isolation'],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    skills: ['Docker', 'Git', 'Jupyter Notebook', 'Google Colab', 'VS Code', 'Linux (Jetson Nano)'],
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    skills: ['Leadership', 'Problem Solving', 'Communication', 'Team Collaboration', 'Adaptability'],
  },
]
```

---

### `src/data/experience.js`
```js
// Items ordered newest-first (the timeline renders them top-to-bottom = newest on top).
export const experiences = [
  {
    id: 'exp-1',
    role:     'IT Project Manager',
    company:  'PT. Teknologi e-Manufaktur',
    location: 'Bogor, Indonesia',
    type:     'On-site',
    period:   'May 2026 – Present',
    current:  true,   // renders the node with a brighter/pulsing glow
    bullets: [
      'Lead end-to-end ERP implementations covering inquiry, quotation, costing, and approval workflows across 4 key business stakeholders.',
      'Coordinate cross-functional teams of developers, business analysts, and stakeholders throughout the project lifecycle.',
      'Manage planning, task prioritisation, resource allocation, and progress monitoring to ensure timely delivery.',
      'Facilitate translation of operational requirements into actionable development plans.',
      'Identify project risks and propose mitigation strategies.',
    ],
  },
  {
    id: 'exp-2',
    role:     'Full-Stack AI Engineer',
    company:  'PT. Teknologi e-Manufaktur',
    location: 'Bogor, Indonesia',
    type:     'On-site',
    period:   'Nov 2025 – May 2026',
    current:  false,
    bullets: [
      'Developed enterprise ERP modules supporting project cost estimation and financial workflows.',
      'Designed and implemented backend services in Go (Fiber) following Clean Architecture principles.',
      'Built and managed PostgreSQL schemas for complex cost structures (materials, services, operational expenses).',
      'Implemented RESTful APIs for frontend–backend communication.',
      'Built dynamic UIs with React, Vite, and Chakra UI for structured financial data input.',
      'Applied data isolation strategies to secure project-level financial data.',
    ],
  },
  {
    id: 'exp-3',
    role:     'Software & Vision Engineer',
    company:  'PT. Respati Solusi Rekatama',
    location: 'Bogor, Indonesia',
    type:     'On-site',
    period:   'Jun 2024 – Aug 2024',
    current:  false,
    bullets: [
      'Contributed to the initial phase of an Unmanned Ground Vehicle (UGV) development project.',
      'Developed and integrated a high-performance camera system using Python, OpenCV, and embedded Linux (Jetson Nano).',
    ],
  },
  {
    id: 'exp-4',
    role:     'Machine Learning Cohort',
    company:  'Bangkit Academy',
    location: 'Bandung, Indonesia',
    type:     'Hybrid',
    period:   'Feb 2024 – Jul 2024',
    current:  false,
    bullets: [
      'Completed an intensive ML learning path covering Generative AI, Computer Vision, Deep Learning, and Model Deployment (TensorFlow, PyTorch, Python).',
      'Delivered BacaLagi — Book Price Prediction by Condition as the capstone ML Engineer.',
      'Selected Top 50 of 500+ capstone projects for innovation, execution, and real-world impact.',
    ],
  },
  {
    id: 'exp-5',
    role:     'President',
    company:  'HIMATEKKOM ITS',
    location: 'Surabaya, Indonesia',
    type:     'On-site',
    period:   'Mar 2024 – Aug 2024',
    current:  false,
    bullets: [
      'Supervised and led 300+ students as head of the Computer Engineering Department student association.',
      'Reformed organisation structure to address academic, leadership, welfare, talent, and entrepreneurship needs.',
      'Designed and executed high-impact programs with an 87% overall success rate.',
      'Guided succession planning and mentored future leaders.',
    ],
  },
]
```

---

### `src/data/projects.js`
```js
// featured: true → shown first, gets a slightly larger card treatment
// link: null → no external link button rendered
export const projects = [
  {
    id:          'proj-erp',
    title:       'ERP Costing System',
    year:        '2025–2026',
    description: 'Full-stack ERP module managing complex project cost structures including materials, services, and operational expenses. Designed LLM-ready for future AI-driven insights.',
    highlight:   'LLM-ready architecture for future AI automation',
    tags:        ['Go', 'Fiber', 'React', 'PostgreSQL', 'GORM', 'Clean Architecture'],
    link:        null,
    featured:    true,
  },
  {
    id:          'proj-thesis',
    title:       'Hand Gesture AC Control',
    year:        '2025',
    description: 'End-to-end research: 9-class gesture recognition system using Mediapipe landmark extraction and LSTM for real-time interaction, integrated with ESP32 + IR transmitter.',
    highlight:   '95%+ accuracy · real hardware integration · ESP32',
    tags:        ['Python', 'Mediapipe', 'LSTM', 'ESP32'],
    link:        'https://intip.in/PortfolioHikmal', // replace with actual thesis link
    featured:    true,
  },
  {
    id:          'proj-website',
    title:       'MyWebsite — LLM Personal Assistant',
    year:        '2025',
    description: 'Personal website with an embedded Gemini-AI assistant. Fine-tuned with LoRA and enhanced using a RAG pipeline via LangChain for high-accuracy contextual responses.',
    highlight:   'LoRA fine-tuned Gemini + RAG pipeline',
    tags:        ['Python', 'FastAPI', 'React', 'LangChain', 'PostgreSQL', 'Gemini AI'],
    link:        null,
    featured:    false,
  },
  {
    id:          'proj-bacalagi',
    title:       'BacaLagi — Book Price Prediction',
    year:        '2024',
    description: 'End-to-end ML pipeline recommending secondhand book prices from physical condition. Multi-stage YOLOv8 detection + regression model achieving 96%+ detection accuracy.',
    highlight:   'Top 50 of 500+ at Bangkit · 96%+ accuracy',
    tags:        ['YOLOv8', 'Python', 'Roboflow', 'ML Pipeline', 'Regression'],
    link:        'https://intip.in/PortfolioHikmal', // replace with actual project link
    featured:    false,
  },
  {
    id:          'proj-handsign',
    title:       'Hand Sign Recognition',
    year:        '2025',
    description: 'CNN-based alphabet gesture classifier using Mediapipe for real-time hand landmark detection. Trained on a curated diverse dataset.',
    highlight:   '90%+ accuracy on 26-class alphabet recognition',
    tags:        ['CNN', 'Mediapipe', 'Scikit-learn', 'NumPy', 'Python'],
    link:        null,
    featured:    false,
  },
  {
    id:          'proj-folley',
    title:       'Folley — Following Trolley',
    year:        '2024',
    description: 'Prototype unmanned ground vehicle in the form of a smart shopping trolley designed to autonomously follow customers and perform self-checkout.',
    highlight:   'Autonomous UGV · self-checkout prototype',
    tags:        ['UGV', 'Autonomous Systems', 'Embedded'],
    link:        'https://intip.in/PortfolioHikmal', // replace with actual link
    featured:    false,
  },
]
```

---

### `src/data/achievements.js`
```js
export const featuredAchievement = {
  id:          'ach-bangkit',
  icon:        '🏆',
  title:       'Top 50 Capstone Project',
  issuer:      'Bangkit Academy',
  date:        'July 2024',
  description: 'Selected among Top 50 of 500+ participants for excellence in innovation, execution, and real-world impact.',
  link:        'https://intip.in/PortfolioHikmal', // replace with certificate link
}

// Certification ticker — duplicated inside the component for seamless loop
export const certifications = [
  {
    id:     'cert-1',
    name:   'DeepLearning.AI TensorFlow Developer',
    issuer: 'DeepLearning.AI',
    date:   'Jun 2024',
    link:   null, // replace with certificate URL
  },
  {
    id:     'cert-2',
    name:   'Generative Deep Learning with TensorFlow',
    issuer: 'DeepLearning.AI',
    date:   'Jul 2024',
    link:   null,
  },
  {
    id:     'cert-3',
    name:   'Natural Language Processing in TensorFlow',
    issuer: 'DeepLearning.AI',
    date:   'Jun 2024',
    link:   null,
  },
  {
    id:     'cert-4',
    name:   'TensorFlow: Advanced Techniques',
    issuer: 'DeepLearning.AI',
    date:   'Jul 2024',
    link:   null,
  },
  {
    id:     'cert-5',
    name:   'Generative AI for Everyone',
    issuer: 'DeepLearning.AI',
    date:   'Jun 2024',
    link:   null,
  },
  {
    id:     'cert-6',
    name:   'Top 50 Bangkit Capstone 2024',
    issuer: 'Bangkit Academy',
    date:   'Jul 2024',
    link:   null,
  },
]
```

---

## 4. Reusable UI Primitives (`src/components/ui/`)

These are the building blocks used by every section. Build these first.

### `SectionHeader.jsx`
Receives `label` (e.g. `"// 01. ABOUT"`) and `headline` (e.g. `"Engineer. Builder. Problem Solver."`).
```jsx
// Props: { label: string, headline: string, align?: 'left' | 'center' }
export default function SectionHeader({ label, headline, align = 'left' }) {
  return (
    <div style={{ textAlign: align, marginBottom: '2.5rem' }}>
      <p style={{
        fontFamily: 'JetBrains Mono',
        fontSize: '0.8rem',
        color: 'var(--cyan-dim)',
        letterSpacing: '0.2em',
        marginBottom: '0.5rem',
      }}>
        {label}
      </p>
      <h2 style={{
        fontFamily: 'Rajdhani',
        fontWeight: 700,
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        color: 'var(--text-primary)',
        lineHeight: 1.15,
      }}>
        {headline}
      </h2>
    </div>
  )
}
```

### `GlassCard.jsx`
```jsx
// Props: { children, style?, className?, onClick? }
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
```

### `CyberTag.jsx`
```jsx
// Props: { label: string }
export default function CyberTag({ label }) {
  return <span className="tag-cyber">{label}</span>
}
```

### `ScanLine.jsx`
```jsx
export default function ScanLine() {
  return <div className="scan-line" />
}
```

### `RevealWrapper.jsx`
```jsx
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

// Props: { children, delay?: number (ms), style? }
export default function RevealWrapper({ children, delay = 0, style }) {
  const ref = useRevealOnScroll()
  return (
    <div
      ref={ref}
      className="reveal"
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}
```

---

## 5. `hooks/useRevealOnScroll.js`
```js
import { useEffect, useRef } from 'react'

export function useRevealOnScroll() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}
```

---

## 6. `App.jsx`
```jsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ParticleBackground    from './components/ParticleBackground'
import Navbar                from './components/Navbar'
import HeroSection           from './components/HeroSection'
import AboutSection          from './components/AboutSection'
import SkillsSection         from './components/SkillsSection'
import ExperienceSection     from './components/ExperienceSection'
import ProjectsSection       from './components/ProjectsSection'
import AchievementsSection   from './components/AchievementsSection'
import FooterSection         from './components/FooterSection'
import ScanLine              from './components/ui/ScanLine'
import './index.css'

const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  styles: { global: { body: { bg: '#050B18', color: '#E8F4F8' } } },
})

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <ParticleBackground />
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
```

---

## 7. `ParticleBackground.jsx`
Fixed, behind all content (z-index: 0). No data file needed.
```jsx
import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
  const init = useCallback(async (engine) => { await loadSlim(engine) }, [])
  return (
    <Particles
      id="tsparticles"
      init={init}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true, area: 900 } },
          color: { value: '#00F5FF' },
          opacity: { value: 0.15 },
          size: { value: { min: 1, max: 2.5 } },
          links: { enable: true, color: '#00F5FF', opacity: 0.07, distance: 140, width: 1 },
          move: { enable: true, speed: 0.4, outModes: 'bounce' },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: 'repulse' } },
          modes: { repulse: { distance: 80 } },
        },
        detectRetina: true,
      }}
    />
  )
}
```

> **Note:** If using tsParticles v3+, replace `init` prop with `particlesLoaded` and use `initParticlesEngine` hook instead. Check the installed package version first.

---

## 8. `Navbar.jsx`
Imports `personal.links`, `personal.handle` from `src/data/personal.js`.

**Nav links array** (defined inside the component, not in data — these are UI structure):
```js
const NAV_LINKS = [
  { label: 'About',       to: 'about' },
  { label: 'Skills',      to: 'skills' },
  { label: 'Experience',  to: 'experience' },
  { label: 'Projects',    to: 'projects' },
  { label: 'Achievements',to: 'achievements' },
]
```

**Behavior:**
- Fixed top, `z-index: 100`
- On `window.scrollY > 50`: apply `background: rgba(5,11,24,0.88); backdrop-filter: blur(16px)`
- Logo: `personal.handle` + blinking `_` cursor (`animation: typing-cursor 1s infinite`)
- Links: use `react-scroll` `<Link>` with `smooth={true} duration={500} offset={-80}`
- Mobile: hamburger → slide-down drawer with the same links
- Logo font: Rajdhani 700, color `#00F5FF`, size `1.3rem`
- Link font: JetBrains Mono, `0.8rem`, letter-spacing `0.1em`, color `#7A9BB5` → hover `#00F5FF`

---

## 9. `HeroSection.jsx`
Imports `personal` from `src/data/personal.js`. Uses `personal.heroRoles`, `personal.name`, `personal.title`, `personal.location`, `personal.links`.

**Layout — full viewport height, vertically centered:**
```
[ eyebrow tag: personal.location ]
[ personal.title ]               ← Rajdhani 700, clamp(2.5rem,6vw,5rem), cyan glow
[ personal.name ]                ← Rajdhani 600, 2rem, muted
[ role rotator ]                 ← cycles personal.heroRoles every 2500ms
[ CTA buttons ]
[ scroll indicator ↓ ]
```

**Role rotator implementation:**
```jsx
const [roleIndex, setRoleIndex] = useState(0)
const [visible, setVisible] = useState(true)

useEffect(() => {
  const interval = setInterval(() => {
    setVisible(false)
    setTimeout(() => {
      setRoleIndex(i => (i + 1) % personal.heroRoles.length)
      setVisible(true)
    }, 400)
  }, 2500)
  return () => clearInterval(interval)
}, [])

// Render:
<span style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}>
  {personal.heroRoles[roleIndex]}
</span>
```

**CTA Buttons:**
- Primary: "View Projects" → scrolls to `#projects`; border `1px solid #00F5FF`, color `#00F5FF`, hover bg `rgba(0,245,255,0.1)`
- Secondary: "Download CV" → `href` to CV file; same style but dimmer (`--cyan-dim`)

**Radial glow behind text:**
```css
background: radial-gradient(ellipse at 50% 60%, rgba(0,245,255,0.06) 0%, transparent 70%)
```
Applied as `::before` pseudo-element or an absolute `<div>` behind the text block.

**Scroll indicator:** absolute bottom-8, `animation: float 2s ease-in-out infinite`, `↓` in `#00F5FF`

---

## 10. `AboutSection.jsx`
Imports `personal` from `src/data/personal.js`. Uses `personal.summary`, `personal.education`, `personal.stats`, `personal.email`, `personal.phone`, `personal.links`.

**Two-column layout (desktop), single column (mobile):**

Left column:
- `<SectionHeader label="// 01. ABOUT" headline="Engineer. Builder. Problem Solver." />`
- Two short paragraphs (use `personal.summary` + education details)
- Contact row: email · phone · LinkedIn icon link · GitHub icon link

Right column: 2×2 stat grid
- Each cell = `<GlassCard>` with big number (Rajdhani 3rem, cyan) + label (JetBrains Mono 0.7rem, muted)
- Sourced from `personal.stats` array → `.map(stat => <StatCard key={stat.label} {...stat} />)`

**`StatCard` sub-component (defined inside AboutSection.jsx or as a separate file):**
```jsx
function StatCard({ value, label }) {
  return (
    <GlassCard style={{ textAlign: 'center', padding: '1.5rem' }}>
      <p style={{ fontFamily: 'Rajdhani', fontSize: '3rem', color: 'var(--cyan)', fontWeight: 700 }}>
        {value}
      </p>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        {label}
      </p>
    </GlassCard>
  )
}
```

Wrap the whole section in `<RevealWrapper>`.

---

## 11. `SkillsSection.jsx`
Imports `skillCategories` from `src/data/skills.js`.

**Render pattern:**
```jsx
// Each category is one row
{skillCategories.map((cat, i) => (
  <RevealWrapper key={cat.id} delay={i * 80}>
    <div style={{ marginBottom: '1.5rem' }}>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
        {cat.label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {cat.skills.map(skill => (
          <CyberTag key={skill} label={skill} />
        ))}
      </div>
    </div>
  </RevealWrapper>
))}
```

`<SectionHeader label="// 02. SKILLS" headline="The Tech Stack." />`

No other markup needed. The data file drives everything.

---

## 12. `ExperienceSection.jsx`
Imports `experiences` from `src/data/experience.js`.

**Timeline layout:**
```
┌─ [cyan vertical line, position: absolute, left: 20px, top: 0, bottom: 0, width: 2px] ─┐
│
│  ● [node dot]  ──  [GlassCard]
│                    role · company · location/type
│                    [date badge — tag-cyber top-right]
│                    ▸ bullet
│                    ▸ bullet
│
│  ● [node dot]  ──  [GlassCard]
│  ...
```

**Container:** `position: relative; padding-left: 52px`
**Vertical line:** `position: absolute; left: 20px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--cyan), transparent)`
**Node dot:** `position: absolute; left: 14px; width: 14px; height: 14px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 12px var(--cyan)`
  - If `exp.current === true`: add `animation: pulse-glow 2s infinite`

**Render pattern:**
```jsx
{experiences.map((exp, i) => (
  <RevealWrapper key={exp.id} delay={i * 100} style={{ position: 'relative', marginBottom: '2rem' }}>
    {/* Node dot */}
    <div style={{ position: 'absolute', left: '-38px', top: '1.2rem', ...nodeStyle(exp.current) }} />
    <GlassCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)' }}>{exp.role}</p>
          <p style={{ fontFamily: 'Inter', fontSize: '0.88rem', color: 'var(--cyan-dim)' }}>{exp.company} · {exp.location} · {exp.type}</p>
        </div>
        <CyberTag label={exp.period} />
      </div>
      <ul style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {exp.bullets.map((b, bi) => (
          <li key={bi} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  </RevealWrapper>
))}
```

`<SectionHeader label="// 03. EXPERIENCE" headline="Where I've Worked." />`

---

## 13. `ProjectsSection.jsx`
Imports `projects` from `src/data/projects.js`.

**Grid:** 3 columns desktop (`grid-template-columns: repeat(3,1fr)`), 2 tablet, 1 mobile.

Featured projects (`featured: true`) can optionally span 2 columns on desktop via `grid-column: span 2` — apply only to the first featured item if desired.

**`ProjectCard` sub-component (defined in same file or separate):**
```jsx
function ProjectCard({ project }) {
  return (
    <GlassCard style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: 0 }}>
      {/* Top accent bar */}
      <div style={{ height: '3px', background: 'var(--cyan)', boxShadow: '0 0 12px var(--cyan)' }} />

      <div style={{ padding: '1.2rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            {project.title}
          </p>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0 }}>
            {project.year}
          </span>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.55, flex: 1 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tags.map(tag => <CyberTag key={tag} label={tag} />)}
        </div>

        {/* Footer row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'var(--cyan)', opacity: 0.8 }}>
            ✦ {project.highlight}
          </span>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer"
               style={{ color: 'var(--cyan)', fontSize: '0.8rem', textDecoration: 'none', flexShrink: 0 }}>
              ↗
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
```

**Render:**
```jsx
<SectionHeader label="// 04. PROJECTS" headline="Things I've Built." />
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
  {projects.map((proj, i) => (
    <RevealWrapper key={proj.id} delay={i * 80}>
      <ProjectCard project={proj} />
    </RevealWrapper>
  ))}
</div>
```

---

## 14. `AchievementsSection.jsx`
Imports `featuredAchievement`, `certifications` from `src/data/achievements.js`.

**Sub-section 1 — Featured Achievement Card:**
```jsx
<RevealWrapper>
  <GlassCard style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '2rem', animation: 'pulse-glow 3s infinite' }}>
    <span style={{ fontSize: '3.5rem' }}>{featuredAchievement.icon}</span>
    <div>
      <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-primary)' }}>
        {featuredAchievement.title}
      </p>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--cyan)', marginBottom: '0.5rem' }}>
        {featuredAchievement.issuer} · {featuredAchievement.date}
      </p>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        {featuredAchievement.description}
      </p>
    </div>
    {featuredAchievement.link && (
      <a href={featuredAchievement.link} target="_blank" rel="noreferrer"
         style={{ marginLeft: 'auto', color: 'var(--cyan)', fontSize: '0.85rem', flexShrink: 0 }}>
        View ↗
      </a>
    )}
  </GlassCard>
</RevealWrapper>
```

**Sub-section 2 — Certification Ticker:**
```jsx
// Duplicate the array for seamless loop
const doubled = [...certifications, ...certifications]

<div style={{ overflow: 'hidden', marginTop: '2rem' }}>
  <div className="ticker-track">
    {doubled.map((cert, i) => (
      <div key={i} className="glass-card"
           style={{ flexShrink: 0, padding: '0.6rem 1.2rem', display: 'flex', flexDirection: 'column', minWidth: '240px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{cert.name}</span>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--cyan)' }}>{cert.issuer} · {cert.date}</span>
      </div>
    ))}
  </div>
</div>
```

`<SectionHeader label="// 05. ACHIEVEMENTS" headline="Recognition & Certifications." />`

---

## 15. `FooterSection.jsx`
Imports `personal` from `src/data/personal.js`. Uses `personal.handle`, `personal.links`, `personal.footerNote`.

```jsx
<footer style={{ position: 'relative', zIndex: 1, padding: '3rem 0 2rem' }}>
  <ScanLine />
  <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
    <div>
      <p style={{ fontFamily: 'Rajdhani', fontSize: '1.2rem', color: 'var(--cyan)', fontWeight: 700 }}>
        {personal.handle}<span style={{ animation: 'typing-cursor 1s infinite' }}>_</span>
      </p>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
        {personal.footerNote}
      </p>
    </div>
    <div style={{ display: 'flex', gap: '1.2rem' }}>
      <a href={personal.links.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--cyan-dim)', fontSize: '0.82rem', textDecoration: 'none', fontFamily: 'JetBrains Mono' }}>LinkedIn</a>
      <a href={personal.links.github}   target="_blank" rel="noreferrer" style={{ color: 'var(--cyan-dim)', fontSize: '0.82rem', textDecoration: 'none', fontFamily: 'JetBrains Mono' }}>GitHub</a>
      <a href={personal.links.portfolio} target="_blank" rel="noreferrer" style={{ color: 'var(--cyan-dim)', fontSize: '0.82rem', textDecoration: 'none', fontFamily: 'JetBrains Mono' }}>Portfolio</a>
    </div>
    <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--text-muted)', width: '100%', textAlign: 'center', marginTop: '1rem' }}>
      © 2025 Muhammad Hikmal Akbar
    </p>
  </div>
  <ScanLine style={{ marginTop: '1.5rem' }} />
</footer>
```

---

## 16. Section Layout Wrapper (apply inside every section component)

```jsx
// Wrap every section's content in this pattern:
<section id="sectionId" style={{ padding: 'clamp(4rem,8vw,6rem) 0', position: 'relative', zIndex: 1 }}>
  <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
    {/* section content here */}
  </div>
</section>
```

---

## 17. Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `< 640px` | Single column everywhere; font sizes ~80% of desktop; hamburger nav; timeline cards full-width |
| `640–1024px` | 2-column project grid; condensed about (stack vertically); timeline unchanged |
| `> 1024px` | 3-column projects; 2-column about; full timeline |

Use Tailwind: `sm:`, `md:`, `lg:` prefixes on className, or inline style with `useBreakpointValue` from Chakra.

---

## 18. Animation Reference

| Element | Animation |
|---|---|
| Section entrance | `RevealWrapper` → `.reveal` + `.visible` class via IntersectionObserver |
| Skill rows | `RevealWrapper delay={i * 80}` — staggered fade-in |
| Timeline cards | `RevealWrapper delay={i * 100}` — slide-in from translateY |
| Project cards | `RevealWrapper delay={i * 80}` |
| Hero role text | `opacity` fade in/out via `useState` + `setInterval` |
| Current job dot | `animation: pulse-glow 2s infinite` |
| Achievement card | `animation: pulse-glow 3s infinite` |
| Particle field | tsParticles always running at z-index 0 |
| Cert ticker | CSS `animation: ticker 30s linear infinite`, pauses on hover |
| Navbar logo cursor | `animation: typing-cursor 1s infinite` |
| Scroll indicator | `animation: float 2s ease-in-out infinite` |
| Skill tag hover | CSS `scale(1.05)` + glow (no JS needed) |

**Performance rule:** Only `transform` and `opacity` in animations — no layout-triggering properties.

---

## 19. Data ↔ Component Mapping Reference

| Data file | Consumed by |
|---|---|
| `personal.js` | `HeroSection`, `AboutSection`, `Navbar`, `FooterSection` |
| `skills.js` | `SkillsSection` |
| `experience.js` | `ExperienceSection` |
| `projects.js` | `ProjectsSection` |
| `achievements.js` | `AchievementsSection` |

No component should hard-code any portfolio content. If a component needs a piece of text that doesn't exist in a data file yet, add it to the appropriate data file first.

---

## 20. Quality Checklist for Agent

- [ ] All 5 data files created and exported correctly
- [ ] All 5 UI primitives (`SectionHeader`, `GlassCard`, `CyberTag`, `ScanLine`, `RevealWrapper`) built before sections
- [ ] Particles render at z-index 0, behind all content
- [ ] Navbar blurs on scroll using `window.scrollY` listener
- [ ] Hero fills `100vh`, role rotator cycles automatically
- [ ] `personal.stats` renders as 2×2 stat grid in AboutSection
- [ ] `skillCategories` maps to staggered tag rows — no hard-coded skill names in JSX
- [ ] `experiences` maps to timeline — no hard-coded job entries in JSX
- [ ] `projects` maps to card grid — no hard-coded project text in JSX
- [ ] `certifications` maps to ticker (array doubled for loop)
- [ ] `featuredAchievement` renders as highlight card with pulse-glow
- [ ] `personal.links` used in Footer and Navbar (not duplicated elsewhere)
- [ ] `RevealWrapper` used on every major section block
- [ ] `prefers-reduced-motion` CSS rule disables all animations
- [ ] No horizontal overflow on any viewport width
- [ ] Mobile hamburger menu functional

---

## 21. Known Pitfalls to Avoid

1. **Chakra + Tailwind conflicts:** Use Chakra style props OR Tailwind classes on a given element, never both. Prefer plain inline styles or Tailwind for layout, Chakra for theme-aware values.
2. **tsParticles v3 API:** The `init` prop may be `particlesLoaded` in newer versions. Check `package.json` version and adjust accordingly.
3. **Z-index stacking:** Particles = 0 · Section content = 1 · Navbar = 100.
4. **`backdrop-filter` on Safari:** Always include `-webkit-backdrop-filter` alongside `backdrop-filter` in `.glass-card`.
5. **Ticker loop:** Duplicate the `certifications` array (not slice) so the CSS transform never shows a gap.
6. **`RevealWrapper` in grids:** If inside a CSS grid, ensure `RevealWrapper`'s `<div>` doesn't break the grid track sizing — add `style={{ display: 'contents' }}` or wrap the grid item in a plain `<div>` before `RevealWrapper`.
7. **Key props on mapped data:** Always use `id` fields from data objects as React `key`, not array index.
8. **Tailwind purge:** `content: ['./index.html', './src/**/*.{js,jsx}']` must be set or all Tailwind classes are stripped in build.
