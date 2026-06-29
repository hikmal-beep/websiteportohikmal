import { personal } from '../data/personal'
import ScanLine from './ui/ScanLine'

export default function FooterSection() {
  return (
    <footer className="footer-section">
      <ScanLine />
      <div className="footer-inner">
        <div>
          <p className="footer-logo">
            {personal.handle}
            <span className="cursor">_</span>
          </p>
          <p className="footer-note">{personal.footerNote}</p>
        </div>
        <div className="footer-links">
          <a href={personal.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={personal.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={personal.links.portfolio} target="_blank" rel="noreferrer">
            Portfolio
          </a>
        </div>
        <p className="copyright">Copyright 2025 Muhammad Hikmal Akbar</p>
      </div>
    </footer>
  )
}
