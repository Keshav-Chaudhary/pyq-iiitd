import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import courseData from '../courseData.json'
import { BRANCHES, getBranch, getFullName, getSubjectCurriculumMeta } from '../data/branchMap'
import { PROGRAMS } from '../data/programData'
import { COURSE_ROWS } from '../data/courseRows'
import { 
  Monitor, Zap, Sigma, Palette, Users, Dna, Bot, Cpu, Shield,
  Unlock, Gift, Search, ShieldCheck, Heart, Download, Smartphone, CodeXml 
} from 'lucide-react'
import '../styles/Home.css'

const STATS = {
  subjects: courseData.length,
  files: courseData.reduce((s, c) => s + c.years.reduce((a, y) => a + y.files.length, 0), 0),
  years: (() => {
    const s = new Set()
    courseData.forEach((c) => c.years.forEach((y) => { if (y.year !== 'Other') s.add(y.year) }))
    return s.size
  })(),
  branches: BRANCHES.length - 1,
}

const FEATURED = ['DSA','OS','DBMS','AI','ML','CN','ADA','TOC','CO','NLP','DM','LA']

const BRANCH_ICONS = {
  CSE: <Monitor size={20} strokeWidth={2.5} />,
  ECE: <Zap size={20} strokeWidth={2.5} />,
  CSAM: <Sigma size={20} strokeWidth={2.5} />,
  CSD: <Palette size={20} strokeWidth={2.5} />,
  CSSS: <Users size={20} strokeWidth={2.5} />,
  CSB: <Dna size={20} strokeWidth={2.5} />,
  CSAI: <Bot size={20} strokeWidth={2.5} />,
  EVE: <Cpu size={20} strokeWidth={2.5} />,
  CSEC: <Shield size={20} strokeWidth={2.5} />
}

// Framer Motion Animation Settings
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const slideFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 16
    }
  }
}

const popIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14
    }
  }
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }
    const q = query.toLowerCase()
    const matches = courseData.filter(s => {
      const abbrMatch = s.subject.toLowerCase().includes(q)
      const fullNameMatch = getFullName(s.subject).toLowerCase().includes(q)
      return abbrMatch || fullNameMatch
    }).slice(0, 6)
    setSuggestions(matches)
    setActiveSuggestion(-1)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (activeSuggestion < suggestions.length - 1) {
        setActiveSuggestion(prev => prev + 1)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (activeSuggestion > 0) {
        setActiveSuggestion(prev => prev - 1)
      }
    } else if (e.key === 'Enter') {
      if (activeSuggestion >= 0 && activeSuggestion < suggestions.length) {
        e.preventDefault()
        navigate(`/subject/${encodeURIComponent(suggestions[activeSuggestion].subject)}`)
      }
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/subjects?q=${encodeURIComponent(query.trim())}`)
  }

  const featured = FEATURED.map((n) => courseData.find((s) => s.subject === n)).filter(Boolean)

  return (
    <div className="home">

      {/* ── Hero ─────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg-glow" aria-hidden="true" />

        <div className="container hero-inner">
          <motion.div 
            className="hero-content"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="hero-badges" variants={slideFadeUp}>
              <span className="nosignup-badge">
                <Unlock size={14} strokeWidth={3} style={{marginRight: '6px'}} />
                No signup required
              </span>
              <span className="hero-badge-free">
                <Gift size={14} strokeWidth={3} style={{marginRight: '6px'}} />
                Always free
              </span>
            </motion.div>

            <motion.h1 className="hero-title" variants={slideFadeUp}>
              IIITD PYQ's <span className="brand-author-hero">By Kc</span>
              <br />
              <span className="hero-gradient">Ultimate Archive</span>
            </motion.h1>

            <motion.p className="hero-sub" variants={slideFadeUp}>
              Your open-source archive for past exams, quizzes, and solutions across <strong>{STATS.subjects}</strong> courses.
            </motion.p>

            <motion.div className="hero-search-container" ref={dropdownRef} variants={slideFadeUp}>
              <form className="hero-search-form" onSubmit={handleSearch} role="search">
                <div className="hero-search-wrap">
                  <span className="hero-search-icon" aria-hidden="true">
                    <Search size={16} strokeWidth={2.5} />
                  </span>
                  <input
                    ref={inputRef}
                    className="hero-search-input"
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search subject — DSA, OS, ML, CN..."
                    aria-label="Search subjects"
                    autoComplete="off"
                  />
                  {query && (
                    <button type="button" className="hero-search-clear" onClick={() => { setQuery(''); inputRef.current?.focus(); }} aria-label="Clear">✕</button>
                  )}
                </div>
                <button type="submit" className="hero-search-btn">Search →</button>
              </form>

              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div 
                    className="hero-search-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                  >
                      <div className="hero-search-dropdown-header">
                        <span>Subjects</span>
                      </div>
                      <div className="hero-search-dropdown-list">
                        {suggestions.map((s, idx) => {
                          const fullName = getFullName(s.subject)
                          const meta = getSubjectCurriculumMeta(s.subject)
                          const displayBranches = meta.branches.slice(0, 3)

                          return (
                            <div 
                              key={s.subject} 
                              className={`hero-suggestion-item ${idx === activeSuggestion ? 'active' : ''}`}
                              onMouseEnter={() => setActiveSuggestion(idx)}
                              onClick={() => navigate(`/subject/${encodeURIComponent(s.subject)}`)}
                            >
                              <div className="hs-left">
                                <span className="hs-abbr">{s.subject}</span>
                                {fullName !== s.subject && <span className="hs-fullname">{fullName}</span>}
                              </div>
                              <div className="hs-right sc-branch-cluster">
                                {displayBranches.map(b => (
                                  <span key={b.id} className="sc-branch-badge-sm" style={{ background: `${b.color}15`, color: b.color }} title={b.label}>
                                    {b.icon} {b.label}
                                  </span>
                                ))}
                                {meta.branches.length > 3 && (
                                  <span className="sc-branch-badge-sm" style={{ background: 'var(--card-hover)', color: 'var(--text-muted)' }}>
                                    +{meta.branches.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div className="hero-quick" variants={slideFadeUp}>
              {FEATURED.slice(0, 6).map((name) => (
                <Link key={name} to={`/subject/${encodeURIComponent(name)}`} className="hero-quick-chip">
                  {name}
                </Link>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats panel */}
          <motion.div 
            className="hero-stats"
            variants={popIn}
            initial="hidden"
            animate="visible"
          >
            <div className="hstat">
              <div className="hstat-num">{STATS.subjects}</div>
              <div className="hstat-label">Subjects</div>
            </div>
            <div className="hstat-divider" />
            <div className="hstat">
              <div className="hstat-num">{STATS.files.toLocaleString()}</div>
              <div className="hstat-label">Files</div>
            </div>
            <div className="hstat-divider" />
            <div className="hstat">
              <div className="hstat-num">{STATS.years}</div>
              <div className="hstat-label">Years</div>
            </div>
            <div className="hstat-divider" />
            <div className="hstat">
              <div className="hstat-num">{STATS.branches}</div>
              <div className="hstat-label">Branches</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How it Works ─────────────────────────── */}
      <section className="section how-it-works-section">
        <div className="container">
          <div className="text-center-head">
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub">Get your past year question papers in 3 simple steps</p>
          </div>

          <motion.div 
            className="steps-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              { 
                num: '01', 
                title: 'Check Your Syllabus', 
                desc: 'Visit the B.Tech Curriculum section to see all core/elective courses mapped semester-by-semester.' 
              },
              { 
                num: '02', 
                title: 'Browse PYQ Database', 
                desc: 'Search by course code or filter by branch to find midterm, endterm, or quiz folders.' 
              },
              { 
                num: '03', 
                title: 'Direct PDF Download', 
                desc: 'Download papers and answers instantly. Explore Repository Analytics to see our stats!' 
              }
            ].map((step) => (
              <motion.div 
                className="step-card" 
                key={step.num}
                variants={slideFadeUp}
              >
                <div className="step-num">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Browse by Branch ─────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Browse by Branch</h2>
              <p className="section-sub">Filter subjects relevant to your programme</p>
            </div>
            <Link to="/subjects" className="see-all">View all subjects →</Link>
          </div>

          <motion.div 
            className="branch-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {BRANCHES.filter((b) => b.id !== 'all').map((branch) => {
              const count = courseData.filter((s) => getBranch(s.subject) === branch.id).length
              const programMeta = PROGRAMS.find((p) => p.code === branch.id)
              return (
                <motion.div
                  key={branch.id}
                  variants={slideFadeUp}
                  className="branch-card-wrap"
                >
                  <div
                    className="branch-card"
                    style={{ '--branch-color': branch.color }}
                  >
                    <div className="branch-card-top">
                      <span className="branch-icon" style={{ color: branch.color }}>{BRANCH_ICONS[branch.id] || branch.icon}</span>
                      <div className="branch-info">
                        <span className="branch-label">{branch.label}</span>
                        <span className="branch-count">{count} subjects</span>
                      </div>
                    </div>
                    <p className="branch-full-name">{programMeta?.name || ''}</p>
                    <div className="branch-card-actions">
                      <Link to={`/subjects?branch=${encodeURIComponent(branch.id)}`} className="branch-action-btn">
                        Papers
                      </Link>
                      <Link to={`/subjects?tab=curriculum&branch=${encodeURIComponent(branch.id)}`} className="branch-action-btn branch-action-secondary">
                        Syllabus
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Popular Subjects ─────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Popular Subjects</h2>
              <p className="section-sub">Most accessed across all branches</p>
            </div>
            <Link to="/subjects" className="see-all">Browse all →</Link>
          </div>

          <motion.div 
            className="popular-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {featured.map((s) => {
              const total = s.years.reduce((a, y) => a + y.files.length, 0)
              const years = s.years.map((y) => y.year).filter((y) => y !== 'Other').sort((a, b) => b - a)
              const branch = getBranch(s.subject)
              const branchInfo = BRANCHES.find((b) => b.id === branch)
              const courseRow = COURSE_ROWS.find(r => r.course_code_hint?.toUpperCase() === s.subject.toUpperCase())
              const semLabel = courseRow ? `Sem ${courseRow.semester}` : null

              return (
                <motion.div
                  key={s.subject}
                  variants={slideFadeUp}
                >
                  <Link
                    to={`/subject/${encodeURIComponent(s.subject)}`}
                    className="popular-row"
                  >
                    <div className="popular-row-left">
                      <span
                        className="popular-row-badge"
                        style={{ background: `${branchInfo?.color}18`, color: branchInfo?.color }}
                      >
                        {s.subject}
                      </span>
                      <div className="popular-row-details">
                        <span className="popular-row-name">{getFullName(s.subject)}</span>
                        <span className="popular-row-branch-label" style={{ color: branchInfo?.color }}>
                          {BRANCH_ICONS[branch] || branchInfo?.icon} {branch} {semLabel && `· ${semLabel}`}
                        </span>
                      </div>
                    </div>
                    <div className="popular-row-right">
                      <span className="popular-row-files">{total} files</span>
                      <span className="popular-row-years">
                        {years.length > 0 ? `${years[years.length-1]}–${years[0]}` : 'N/A'}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ Section ─────────────────────────── */}
      <section className="section section-alt faq-section">
        <div className="container">
          <div className="text-center-head">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">Quick answers to common student inquiries</p>
          </div>

          <motion.div 
            className="faq-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              { q: 'Are official solutions provided?', a: 'Many question papers contain student-contributed or official solutions. Look for files labeled with "-sol" or check the files directory inside each subject.' },
              { q: 'Is this service official?', a: 'No, this is an open-source, student-driven initiative to archive course documents. It is not officially affiliated with IIIT Delhi.' },
              { q: 'How can I contribute new papers?', a: 'You can easily upload papers by opening a Pull Request on our GitHub repository or contacting the administrators directly through the details in the About page.' },
              { q: 'Why is there no login requirement?', a: 'We believe academic resources should be friction-free. We don\'t collect cookies, log search queries, or require any registration to access the files.' }
            ].map((faq, i) => (
              <motion.div 
                className="faq-card" 
                key={i}
                variants={slideFadeUp}
              >
                <h3 className="faq-question">{faq.q}</h3>
                <p className="faq-answer">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why no signup ────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="nosignup-section">
            <motion.div 
              className="nosignup-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title">Zero friction. Just papers.</h2>
              <p className="section-sub" style={{maxWidth:'480px'}}>
                Unlike other platforms, IIITD PYQs has no accounts, no ads, no paywalls.
                Open the site, find your subject, download. That's it.
              </p>
              <div className="nosignup-features">
                {[
                  {
                    icon: <Unlock size={18} strokeWidth={2.5} />,
                    text: 'No signup or login',
                    desc: 'Instant entry without inputting your credentials.'
                  },
                  {
                    icon: <ShieldCheck size={18} strokeWidth={2.5} />,
                    text: 'No ads or tracking',
                    desc: 'Clean, distraction-free environment.'
                  },
                  {
                    icon: <Heart size={18} strokeWidth={2.5} />,
                    text: 'Completely free forever',
                    desc: 'Backed by student contributions, zero fees.'
                  },
                  {
                    icon: <Download size={18} strokeWidth={2.5} />,
                    text: 'Instant access to all files',
                    desc: 'Single-click high speed direct downloads.'
                  },
                  {
                    icon: <Smartphone size={18} strokeWidth={2.5} />,
                    text: 'Works on any device',
                    desc: 'Fully optimized for phone, tablet, and PC.'
                  },
                  {
                    icon: <CodeXml size={18} strokeWidth={2.5} />,
                    text: 'Open source on GitHub',
                    desc: 'Transparent, community-driven development.'
                  },
                ].map(({ icon, text, desc }) => (
                  <div key={text} className="nosignup-feature">
                    <span className="feature-icon-wrap">{icon}</span>
                    <div className="feature-text-wrap">
                      <span className="feature-title">{text}</span>
                      <span className="feature-desc">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/subjects" className="cta-btn">Start Browsing →</Link>
            </motion.div>
            <motion.div 
              className="nosignup-right" 
              aria-hidden="true"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="nosignup-card-mock">
                <div className="mock-row mock-header" />
                <div className="mock-row" />
                <div className="mock-row mock-short" />
                <div className="mock-divider" />
                <div className="mock-file-row">
                  <div className="mock-file-icon" />
                  <div className="mock-file-name" />
                  <div className="mock-file-btn" />
                </div>
                <div className="mock-file-row">
                  <div className="mock-file-icon" />
                  <div className="mock-file-name mock-file-name-short" />
                  <div className="mock-file-btn" />
                </div>
                <div className="mock-file-row">
                  <div className="mock-file-icon" />
                  <div className="mock-file-name" />
                  <div className="mock-file-btn" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
