import { skillCategories } from '../data/skills'
import CyberTag from './ui/CyberTag'
import RevealWrapper from './ui/RevealWrapper'
import SectionHeader from './ui/SectionHeader'

export default function SkillsSection() {
  return (
    <section id="skills" className="section-wrap">
      <div className="section-inner section-inner--narrow">
        <SectionHeader label="// 02. SKILLS" headline="The Tech Stack." />
        {skillCategories.map((cat, index) => (
          <RevealWrapper key={cat.id} delay={index * 80}>
            <div className="skill-row">
              <p className="skill-label">{cat.label}</p>
              <div className="tag-list">
                {cat.skills.map((skill) => (
                  <CyberTag key={skill} label={skill} />
                ))}
              </div>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}
