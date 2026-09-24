import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Library } from 'lucide-react'
import pkg from '../package.json'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import ToastContainer from './components/ToastContainer'
import PwaUpdatePrompt from './components/PwaUpdatePrompt'
import FloatingStarCTA from './components/FloatingStarCTA'
import Home from './pages/Home'
import SubjectList from './pages/SubjectList'
import SubjectDetail from './pages/SubjectDetail'
import About from './pages/About'
import Legal from './pages/Legal'
import Analytics from './pages/Analytics'
import Resources from './pages/Resources'
import NotFound from './pages/NotFound'
import PdfViewer from './pages/PdfViewer'
import Contributors from './pages/Contributors'
import OfflineScreen from './components/OfflineScreen'
import './styles/App.css'

const GithubIcon = ({ size = 13, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{opacity:0.5}}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

function Footer() {
  const [lastUpdated, setLastUpdated] = useState(() => {
    return typeof __APP_LAST_UPDATED__ !== 'undefined' ? __APP_LAST_UPDATED__ : null
  })

  useEffect(() => {
    fetch('/data/syncReport.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.timestamp) {
          setLastUpdated(data.timestamp)
        }
      })
      .catch(() => {})
  }, [])

  const formatUpdatedDate = (iso) => {
    if (!iso) return null
    try {
      const d = new Date(iso)
      if (isNaN(d.getTime())) return null
      return (
        d.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }) +
        ', ' +
        d.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    } catch {
      return null
    }
  }

  const updatedText = formatUpdatedDate(lastUpdated)

  return (
    <footer className="footer" role="contentinfo">
      {/* Decorative gradient accent bar */}
      <div className="footer-accent" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-grid">

          {/* ── Brand Column ──────────────────────── */}
          <div className="footer-brand">
            <div className="footer-brand-logo-new">
              <div className="footer-logo-icon-new">
                <Library size={22} strokeWidth={2.5} color="white" />
              </div>
              <div className="footer-brand-text-new">
                <div className="footer-brand-title">
                  IIITD PYQ&apos;s <span className="brand-author">By Kc</span>
                  <span className="brand-version" style={{ 
                    background: 'rgba(63, 173, 168, 0.1)', 
                    color: 'var(--primary-light)', 
                    border: '1px solid rgba(63, 173, 168, 0.2)',
                    padding: '2px 8px', 
                    borderRadius: '20px', 
                    fontSize: '0.55rem', 
                    fontWeight: '700',
                    letterSpacing: '0.5px',
                    marginLeft: '8px',
                    verticalAlign: 'middle',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif'
                  }}>v{pkg.version}</span>
                </div>
                <div className="footer-brand-subtitle">Open-source • Free forever</div>
              </div>
            </div>
            <p className="footer-brand-desc">
              A community-driven hub for IIITD past-year question papers. 
              No sign-up, no paywall — just papers when you need them.
            </p>
            <div className="footer-social-row">
              <a href="https://github.com/NalishJain/IIITD-PYQs" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="GitHub Repository" title="GitHub Repository">
                <GithubIcon size={18} />
              </a>
              <a href="https://www.iiitd.ac.in" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="IIITD Official" title="IIITD Official">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
              <a href="https://docs.google.com/spreadsheets/d/1zzMJGNCGggm3CUw2TMCuYfkE6JWEZ1oaJqio-3WGuxQ/edit?usp=sharing" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Course Sheet" title="Course Sheet">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
              </a>
            </div>
          </div>

          {/* ── Quick Links Column ────────────────── */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigate</h4>
            <ul className="footer-link-list">
              <li><a href="/">Home</a></li>
              <li><a href="/subjects">Explore Subjects</a></li>
              <li><a href="/subjects?tab=curriculum">B.Tech Curriculum</a></li>
              <li><a href="/analytics">Analytics</a></li>
              <li><a href="/resources">Resources & Journey</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contributors">Contributors</a></li>
            </ul>
          </div>

          {/* ── Resources Column ──────────────────── */}
          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-link-list">
              <li>
                <a href="https://github.com/NalishJain/IIITD-PYQs" target="_blank" rel="noreferrer">
                  PYQ Repository <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a href="https://github.com/Keshav-Chaudhary" target="_blank" rel="noreferrer">
                  Developer Profile <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a href="https://docs.google.com/spreadsheets/d/1zzMJGNCGggm3CUw2TMCuYfkE6JWEZ1oaJqio-3WGuxQ/edit?usp=sharing" target="_blank" rel="noreferrer">
                  Course Sheet <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a href="https://www.iiitd.ac.in" target="_blank" rel="noreferrer">
                  IIITD Official <ExternalLinkIcon />
                </a>
              </li>
            </ul>
          </div>

          {/* ── Contribute Column ─────────────────── */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contribute</h4>
            <p className="footer-col-desc">
              Have a paper that&apos;s missing? Help fellow students by contributing to the open-source repository.
            </p>
            <a href="https://github.com/NalishJain/IIITD-PYQs" target="_blank" rel="noreferrer" className="footer-contribute-btn">
              <GithubIcon size={15} /> Contribute on GitHub
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────── */}
      <div className="footer-bottom-wrap">
        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} IIITD PYQ&apos;s By Kc — Open source, student-maintained
            <span style={{ margin: '0 8px', opacity: 0.5 }}>·</span>
            <span className="footer-version-badge" style={{ 
              background: 'rgba(63, 173, 168, 0.1)', 
              color: 'var(--primary-light)', 
              border: '1px solid rgba(63, 173, 168, 0.2)',
              padding: '2px 10px', 
              borderRadius: '20px', 
              fontSize: '0.7rem', 
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>v{pkg.version}</span>
            {updatedText && (
              <>
                <span style={{ margin: '0 8px', opacity: 0.5 }}>·</span>
                <span 
                  className="footer-updated-badge"
                  title={`Last synchronized via GitHub Actions: ${new Date(lastUpdated).toLocaleString()}`}
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: 'rgba(16, 185, 129, 0.08)', 
                    color: '#34d399', 
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    padding: '2px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.7rem', 
                    fontWeight: '600',
                    letterSpacing: '0.3px'
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 6px #10b981',
                    display: 'inline-block'
                  }} aria-hidden="true" />
                  Updated {updatedText}
                </span>
              </>
            )}
          </span>
          <div className="footer-credits">
            <span className="footer-credit-item"><Link to="/legal#privacy">Privacy</Link></span>
            <span className="footer-credit-dot" aria-hidden="true">·</span>
            <span className="footer-credit-item"><Link to="/legal#terms">Terms</Link></span>
            <span className="footer-credit-dot" aria-hidden="true">·</span>
            <span className="footer-credit-item"><Link to="/legal#cookie">Cookies</Link></span>
            <span className="footer-credit-dot" aria-hidden="true">·</span>
            <span className="footer-credit-item"><a href="https://github.com/Keshav-Chaudhary" target="_blank" rel="noreferrer">Contact</a></span>
            <span className="footer-credit-dot" aria-hidden="true" style={{margin:'0 4px', opacity:0.5}}>|</span>
            <span className="footer-credit-item">
              Website by{' '}
              <a href="https://github.com/Keshav-Chaudhary" target="_blank" rel="noreferrer">
                Keshav Chaudhary
              </a>
            </span>
            <span className="footer-credit-dot" aria-hidden="true">·</span>
            <span className="footer-credit-item">
              Source by{' '}
              <a href="https://github.com/NalishJain/IIITD-PYQs" target="_blank" rel="noreferrer">
                Nalish Jain
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}


function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOnline) {
    return <OfflineScreen />
  }

  return (
    <div className="app">
      <Navbar />
      <ScrollToTop />
      <main className="main-content">
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/subjects"            element={<SubjectList />} />
          <Route path="/subject/:subjectName" element={<SubjectDetail />} />
          <Route path="/analytics"           element={<Analytics />} />
          <Route path="/programs"            element={<Navigate to="/subjects?tab=curriculum" replace />} />
          <Route path="/resources"           element={<Resources />} />
          <Route path="/about"               element={<About />} />
          <Route path="/contributors"        element={<Contributors />} />
          <Route path="/legal"               element={<Legal />} />
          <Route path="/view-pdf"            element={<PdfViewer />} />
          <Route path="*"                    element={<NotFound />} />
        </Routes>
        <ScrollToTopButton />
      </main>
      <Footer />
      <ToastContainer />
      <PwaUpdatePrompt />
      <FloatingStarCTA />
    </div>
  )
}

export default App
