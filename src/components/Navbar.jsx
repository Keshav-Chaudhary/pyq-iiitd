import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, FolderOpen, BarChart2, BookOpen, Info, Library, Heart, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import '../styles/Navbar.css'

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const SunIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const AdvancedThemeToggle = ({ theme, toggle }) => {
  const isDark = theme === 'dark'

  return (
    <motion.button
      className={`adv-theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={toggle}
      aria-label="Toggle theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9, rotate: isDark ? -3 : 3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <div className="toggle-track">
        {/* Sky Background */}
        <AnimatePresence>
          {isDark ? (
            <motion.div
              key="stars"
              className="toggle-stars"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="star s1">✦</span>
              <span className="star s2">✦</span>
              <span className="star s3">✦</span>
            </motion.div>
          ) : (
            <motion.div
              key="clouds"
              className="toggle-clouds"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="cloud c1">☁</span>
              <span className="cloud c2">☁</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sliding Thumb */}
        <motion.div
          className="toggle-thumb"
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.button>
  )
}

export default function Navbar() {
  const location = useLocation()
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const close = () => setMenuOpen(false)

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">

        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={close}>
          <div className="brand-logo"><Library size={16} strokeWidth={2.5} color="white" /></div>
          <div className="brand-text">
            <span className="brand-name">IIITD PYQ's <span className="brand-author">By Kc</span></span>
            <span className="brand-sub">Open-source • Free forever</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="navbar-links">
          <Link to="/"          className={`nav-link ${isActive('/')          ? 'active' : ''}`}>Home</Link>
          <Link to="/subjects"  className={`nav-link ${isActive('/subjects')  ? 'active' : ''}`}>Explore</Link>
          <Link to="/analytics" className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}>Analytics</Link>
          <Link to="/resources" className={`nav-link ${isActive('/resources') ? 'active' : ''}`}>Resources & Journey</Link>
          <Link to="/about"     className={`nav-link ${isActive('/about')     ? 'active' : ''}`}>About</Link>
          <Link to="/contributors" className={`nav-link ${isActive('/contributors') ? 'active' : ''}`}>Contributors</Link>
        </div>

        {/* Right actions */}
        <div className="navbar-actions">
          {/* Theme toggle */}
          <AdvancedThemeToggle theme={theme} toggle={toggle} />

          {/* GitHub */}
          <a
            href="https://github.com/NalishJain/IIITD-PYQs"
            target="_blank"
            rel="noreferrer"
            className="nav-github-btn"
            aria-label="View source on GitHub"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu" 
            role="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="mobile-menu-inner" style={{ paddingBottom: '16px', maxHeight: 'calc(100vh - 70px)', overflowY: 'auto' }}>
              <Link to="/"          className={`mobile-link ${isActive('/')          ? 'active' : ''}`} onClick={close}><Home size={18} strokeWidth={2.5} /> Home</Link>
              <Link to="/subjects"  className={`mobile-link ${isActive('/subjects')  ? 'active' : ''}`} onClick={close}><FolderOpen size={18} strokeWidth={2.5} /> Explore Subjects</Link>
              <Link to="/analytics" className={`mobile-link ${isActive('/analytics') ? 'active' : ''}`} onClick={close}><BarChart2 size={18} strokeWidth={2.5} /> Analytics</Link>
              <Link to="/resources" className={`mobile-link ${isActive('/resources') ? 'active' : ''}`} onClick={close}><BookOpen size={18} strokeWidth={2.5} /> Resources & Journey</Link>
              <Link to="/about"     className={`mobile-link ${isActive('/about')     ? 'active' : ''}`} onClick={close}><Info size={18} strokeWidth={2.5} /> About</Link>
              <Link to="/contributors" className={`mobile-link ${isActive('/contributors') ? 'active' : ''}`} onClick={close}><Users size={18} strokeWidth={2.5} /> Contributors</Link>
              <a href="https://github.com/NalishJain/IIITD-PYQs" target="_blank" rel="noreferrer" className="mobile-link" onClick={close}>
                <GithubIcon /> Source Code
              </a>
              <div className="mobile-divider" />
              <div className="mobile-nosignup"><Heart size={16} strokeWidth={2.5} fill="currentColor" /> Made with love for IIITD students</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
