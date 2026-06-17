import { Code2, Archive, BookOpen, CheckCircle2, GitPullRequest, AlertTriangle, BarChart2, School, ExternalLink } from 'lucide-react'
import '../styles/About.css'

const GH = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer" className="gh-link">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
    {children}
  </a>
)

export default function About() {
  return (
    <div className="about-page">

      <div className="about-header">
        <div className="about-header-glow" aria-hidden="true"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1>About <span className="about-title-gradient">IIITD PYQs</span></h1>
          <p>Open-source · No signup · Always free</p>
        </div>
      </div>

      <div className="container about-body">



        {/* What is this */}
        <div className="about-card animate-fadeup" style={{ animationDelay: '0.2s' }}>
          <div className="about-card-icon"><BookOpen size={18} strokeWidth={2.5} /></div>
          <div>
            <h3>What is IIITD PYQs?</h3>
            <p>
              A free, open-source web interface for browsing past year question papers, quizzes,
              mid-sems, end-sems, and solutions from courses at the Indraprastha Institute of
              Information Technology, Delhi (IIITD).
            </p>
            <p>
              No account. No paywall. No ads. Just papers — accessible to every IIITD student instantly.
            </p>
          </div>
        </div>

        {/* No signup */}
        <div className="about-card about-card-green animate-fadeup" style={{ animationDelay: '0.3s' }}>
          <div className="about-card-icon"><CheckCircle2 size={18} strokeWidth={2.5} /></div>
          <div>
            <h3>Why no signup?</h3>
            <p>
              Most study-resource platforms gate content behind accounts, subscriptions, or ads.
              This site does none of that. Every file is served directly from the public GitHub
              repository — open to anyone, forever.
            </p>
            <div className="nosignup-badge" style={{marginTop:'12px', display:'inline-flex', alignItems:'center', gap:'6px'}}>
              <CheckCircle2 size={14} strokeWidth={3} /> No signup required — ever
            </div>
          </div>
        </div>



        {/* Disclaimer */}
        <div className="about-card about-card-warn animate-fadeup" style={{ animationDelay: '0.5s' }}>
          <div className="about-card-icon"><AlertTriangle size={18} strokeWidth={2.5} /></div>
          <div>
            <h3>Disclaimer</h3>
            <p>
              All materials are shared by students for educational purposes only.
              If you are a faculty member and would like a paper removed, please open an issue on
              the <GH href="https://github.com/NalishJain/IIITD-PYQs">GitHub repository</GH>.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="about-links-grid animate-fadeup" style={{ animationDelay: '0.6s' }}>
          {[
            { icon: <Archive size={18} strokeWidth={2.5} />, label: 'PYQ Repository',   href: 'https://github.com/NalishJain/IIITD-PYQs' },
            { icon: <Code2 size={18} strokeWidth={2.5} />, label: 'Developer GitHub',  href: 'https://github.com/Keshav-Chaudhary' },
            { icon: <BarChart2 size={18} strokeWidth={2.5} />, label: 'Course Sheet',      href: 'https://docs.google.com/spreadsheets/d/1zzMJGNCGggm3CUw2TMCuYfkE6JWEZ1oaJqio-3WGuxQ/edit?usp=sharing' },
            { icon: <School size={18} strokeWidth={2.5} />, label: 'IIITD Official',    href: 'https://www.iiitd.ac.in' },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="about-link-card">
              <span className="about-link-icon" style={{display:'flex'}}>{l.icon}</span>
              <span className="about-link-label">{l.label}</span>
              <span className="about-link-arrow" style={{display:'flex'}}><ExternalLink size={16} strokeWidth={2.5} /></span>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}
