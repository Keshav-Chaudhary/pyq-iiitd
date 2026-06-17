import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import courseData from '../courseData.json'
import { BRANCHES, getBranch, getFullName, getSubjectCurriculumMeta } from '../data/branchMap'
import { PROGRAMS } from '../data/programData'
import { COURSE_ROWS } from '../data/courseRows'
import Skeleton from '../components/Skeleton'
import { 
  Search, ListFilter, LayoutGrid, List, SearchX, 
  Download, BookOpen, Clock, Users, ArrowRight, X 
} from 'lucide-react'
import '../styles/SubjectList.css'

/* ─── Constants ──────────────────────────────────── */
const SEM_LABELS = {
  1: 'Semester 1', 2: 'Semester 2', 3: 'Semester 3', 4: 'Semester 4',
  5: 'Semester 5', 6: 'Semester 6', 7: 'Semester 7', 8: 'Semester 8',
}

const TYPE_STYLE = {
  'Core':          { bg: 'rgba(59,130,246,0.15)',  fg: '#93c5fd', dot: '#3b82f6' },
  'Core Elective': { bg: 'rgba(16,185,129,0.15)',  fg: '#6ee7b7', dot: '#10b981' },
  'Elective':      { bg: 'rgba(100,116,139,0.12)', fg: '#94a3b8', dot: '#64748b' },
}

// Build a lookup: course_code_hint → subject in courseData
const PYQ_LOOKUP = {}
courseData.forEach((s) => { PYQ_LOOKUP[s.subject.toUpperCase()] = s.subject })

function resolvePYQ(hint) {
  if (!hint) return null
  const h = hint.trim().toUpperCase()
  return PYQ_LOOKUP[h] || null
}

export default function SubjectList() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // URL Params State
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const branch = searchParams.get('branch') || 'all'
  const semester = searchParams.get('sem') || 'all'
  
  // Local sorting/view options
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('name')
  const [view, setView]     = useState('grid') // grid | list (for subjects)
  const [viewMode, setViewMode] = useState('cards') // cards | table (for curriculum)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Sync URL search params
  useEffect(() => {
    const p = {}
    if (branch !== 'all') p.branch = branch
    if (query) p.q = query
    if (semester !== 'all') p.sem = semester
    
    setSearchParams(p)
  }, [query, branch, semester, setSearchParams])

  // --- Curriculum logic ---
  const program = PROGRAMS.find((p) => p.code === branch) || PROGRAMS[0]
  const branchMeta = BRANCHES.find(b => b.id === branch) || BRANCHES[1]

  const availSems = useMemo(() =>
    [...new Set(COURSE_ROWS.filter(r => r.branch_code === branch).map(r => Number(r.semester)))]
      .sort((a, b) => a - b),
    [branch]
  )

  const curriculumRows = useMemo(() => {
    return COURSE_ROWS.filter((r) => {
      const matchB = r.branch_code === branch
      const matchS = semester === 'all' || String(r.semester) === semester
      const matchQ = !query || r.course_name.toLowerCase().includes(query.toLowerCase()) ||
                     (r.course_code_hint || '').toLowerCase().includes(query.toLowerCase())
      return matchB && matchS && matchQ
    })
  }, [branch, semester, query])

  const bySem = useMemo(() => {
    const map = {}
    curriculumRows.forEach((r) => {
      const s = Number(r.semester)
      if (!map[s]) map[s] = []
      map[s].push(r)
    })
    return Object.entries(map).sort((a, b) => Number(a[0]) - Number(b[0]))
  }, [curriculumRows])

  const totalCoursesForBranch = COURSE_ROWS.filter(r => r.branch_code === branch).length

  // --- Subjects logic ---
  const filteredSubjects = courseData
    .filter((s) => {
      const matchQ = s.subject.toLowerCase().includes(query.toLowerCase()) ||
                     getFullName(s.subject).toLowerCase().includes(query.toLowerCase())
      
      const matchB = branch === 'all' || 
                     getBranch(s.subject) === branch ||
                     COURSE_ROWS.some(r => r.branch_code === branch && r.course_code_hint?.toUpperCase() === s.subject.toUpperCase())
      
      return matchQ && matchB
    })
    .sort((a, b) => {
      if (sortBy === 'name')  return a.subject.localeCompare(b.subject)
      if (sortBy === 'files') {
        return b.years.reduce((s,y)=>s+y.files.length,0) - a.years.reduce((s,y)=>s+y.files.length,0)
      }
      if (sortBy === 'year') {
        return Math.max(...b.years.map(y=>parseInt(y.year)||0)) -
               Math.max(...a.years.map(y=>parseInt(y.year)||0))
      }
      return 0
    })

  const activeBranch = BRANCHES.find((b) => b.id === branch)
  const activeFiltersCount = (sortBy !== 'name' ? 1 : 0)

  // Navigation handlers
  const handleBranchChange = (branchId) => {
    const p = {}
    if (branchId !== 'all') p.branch = branchId
    if (query) p.q = query
    setSearchParams(p)
  }

  const handleSemChange = (semId) => {
    const p = {}
    if (branch !== 'all') p.branch = branch
    if (semId !== 'all') p.sem = semId
    if (query) p.q = query
    setSearchParams(p)
  }

  return (
    <div className="sl-page">
      {/* Glow effect */}
      <div className="sl-header">
        <div className="sl-header-glow" aria-hidden="true" />
        <div className="container" style={{position:'relative', zIndex:2}}>
          <div className="prog-header-top">
            <h1 className="sl-title">Explore <span className="sl-title-gradient">Curriculum & Subjects</span></h1>
            <a href="/iiitd_courses.csv" download="iiitd_courses.csv" className="prog-dl-btn">
              <Download size={15} strokeWidth={2.5} />
              Download CSV
            </a>
          </div>
          <p className="sl-sub">
            Discover comprehensive course structures, B.Tech semester roadmaps, and access direct past year question paper archives.
          </p>
        </div>
      </div>

      <div className="container sl-body">
        {/* Branch Filters */}
        <div className="branch-filter-row" role="group" aria-label="Filter by branch">
          {BRANCHES.map((b) => {
            const count = b.id === 'all'
              ? courseData.length
              : filteredSubjects.filter((s) => getBranch(s.subject) === b.id || COURSE_ROWS.some(r => r.branch_code === b.id && r.course_code_hint?.toUpperCase() === s.subject.toUpperCase())).length

            const isActive = branch === b.id

            return (
              <button
                key={b.id}
                className={`branch-pill ${isActive ? 'active' : ''}`}
                style={isActive ? { '--pill-color': b.color } : {}}
                onClick={() => handleBranchChange(b.id)}
                aria-pressed={isActive}
              >
                <span>{b.icon}</span>
                <span>{b.label}</span>
                <span className="branch-pill-count">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Dynamic Branch Hero Card */}
        {branch !== 'all' && (
          <div className="prog-hero-card" style={{ '--prog-color': branchMeta.color, marginBottom: '24px' }}>
            <div className="prog-hero-icon" style={{ color: branchMeta.color }}>{branchMeta.icon}</div>
            <div className="prog-hero-content">
              <h2 className="prog-hero-title">{program.name}</h2>
              <div className="prog-hero-meta">
                <span className="phm-item"><Clock size={14}/> {program.duration}</span>
                <span className="phm-item"><Users size={14}/> Admission via {program.admission}</span>
                <span className="phm-item"><BookOpen size={14}/> {totalCoursesForBranch} courses</span>
              </div>
              <p className="prog-hero-desc">{program.description}</p>
            </div>
          </div>
        )}

        {/* Unified Search Bar */}
        <div className="sl-controls" style={{ marginBottom: '32px' }}>
          <div className="sl-search-wrap">
            <Search className="sl-search-icon" size={15} strokeWidth={2.5} aria-hidden="true" />
            <input
              className="sl-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={branch === 'all' ? 'Search subjects...' : `Search in ${branchMeta.label} courses and subjects...`}
              aria-label="Search courses"
            />
            {query && (
              <button className="sl-search-clear" onClick={() => setQuery('')} aria-label="Clear search">✕</button>
            )}
          </div>
        </div>

        {/* Semester Curriculum Section (only if branch selected) */}
        {branch !== 'all' && (
          <div className="curriculum-section" style={{ marginBottom: '48px' }}>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
              <h2 className="sl-title" style={{ fontSize: '1.6rem', margin: 0 }}>Semester <span className="sl-title-gradient">Curriculum</span></h2>
              
              <div className="sl-right-controls">
                <div className="prog-sem-pills">
                  <button className={`branch-pill ${semester === 'all' ? 'active' : ''}`} onClick={() => handleSemChange('all')}>All Sems</button>
                  {availSems.map(s => (
                    <button key={s} className={`branch-pill ${semester === String(s) ? 'active' : ''}`} onClick={() => handleSemChange(String(s))}>Sem {s}</button>
                  ))}
                </div>

                <div className="view-toggle" role="group" aria-label="Curriculum View Mode">
                  <button className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`} onClick={() => setViewMode('cards')} aria-label="Card View" title="Card View">
                    <LayoutGrid size={14} strokeWidth={2.5} />
                  </button>
                  <button className={`view-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')} aria-label="Table View" title="Table View">
                    <List size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            <div className="sl-results-bar">
              <span className="sl-count">
                Showing <strong className="sl-active-filter">{curriculumRows.length}</strong> {semester !== 'all' ? `courses for Sem ${semester}` : 'courses total'}
              </span>
              {(query || semester !== 'all') && (
                <button className="sl-clear-all" onClick={() => { setQuery(''); handleSemChange('all') }}>
                  Clear curriculum filters ✕
                </button>
              )}
            </div>

            {curriculumRows.length === 0 ? (
              <div className="sl-empty">
                <div className="sl-empty-icon"><SearchX size={48} strokeWidth={1.5} /></div>
                <h3 className="sl-empty-title">No courses found</h3>
                <p>Try adjusting your search terms or semester filter.</p>
                <button className="sl-clear-btn" onClick={() => { setQuery(''); handleSemChange('all') }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <CurriculumView bySem={bySem} program={branchMeta} semFilter={semester} viewMode={viewMode} />
            )}
          </div>
        )}

        {/* Subject Directory Section */}
        <div className="directory-section">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 className="sl-title" style={{ fontSize: '1.6rem', margin: 0 }}>Subject <span className="sl-title-gradient">Directory</span></h2>
            
            <div className="sl-right-controls">
              <div className="sl-filter-container" ref={dropdownRef}>
                <button 
                  className={`sl-filter-btn ${showDropdown ? 'active' : ''}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                  aria-label="Filter and Sort"
                  title="Sort & Filter"
                >
                  <ListFilter size={15} strokeWidth={2.5} />
                  {activeFiltersCount > 0 && (
                    <span className="sl-filter-badge">{activeFiltersCount}</span>
                  )}
                </button>

                {showDropdown && (
                  <div className="sl-filter-dropdown">
                    <div className="sl-fd-section">
                      <div className="sl-fd-title">Sort By</div>
                      <button className={`sl-fd-option ${sortBy === 'name' ? 'selected' : ''}`} onClick={() => { setSortBy('name'); setShowDropdown(false) }}>A – Z</button>
                      <button className={`sl-fd-option ${sortBy === 'files' ? 'selected' : ''}`} onClick={() => { setSortBy('files'); setShowDropdown(false) }}>Most Files</button>
                      <button className={`sl-fd-option ${sortBy === 'year' ? 'selected' : ''}`} onClick={() => { setSortBy('year'); setShowDropdown(false) }}>Latest Year</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="view-toggle" role="group" aria-label="View mode">
                <button
                  className={`view-btn ${view === 'grid' ? 'active' : ''}`}
                  onClick={() => setView('grid')}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <LayoutGrid size={14} strokeWidth={2.5} />
                </button>
                <button
                  className={`view-btn ${view === 'list' ? 'active' : ''}`}
                  onClick={() => setView('list')}
                  aria-label="List view"
                  title="List view"
                >
                  <List size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          <div className="sl-results-bar">
            <span className="sl-count">
              {filteredSubjects.length === courseData.length
                ? `All ${courseData.length} subjects`
                : `${filteredSubjects.length} of ${courseData.length} subjects`}
              {activeBranch && branch !== 'all' && (
                <span className="sl-active-filter" style={{ color: activeBranch.color }}>
                  {' '}· {activeBranch.icon} {activeBranch.label}
                </span>
              )}
            </span>
            {(query || branch !== 'all') && (
              <button className="sl-clear-all" onClick={() => { setQuery(''); handleBranchChange('all') }}>
                Clear directory filters ✕
              </button>
            )}
          </div>

          {loading ? (
            <div className={view === 'grid' ? 'sl-grid' : 'sl-list'}>
              {Array.from({ length: 12 }).map((_, i) => (
                view === 'grid' ? (
                  <div key={i} className="sc-grid" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Skeleton width="40%" height="24px" />
                      <Skeleton width="60px" height="24px" borderRadius="12px" />
                    </div>
                    <Skeleton width="80%" height="18px" />
                    <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-2)' }}>
                      <Skeleton width="60px" height="14px" />
                      <Skeleton width="100px" height="14px" />
                    </div>
                  </div>
                ) : (
                  <div key={i} className="sc-list" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton width="200px" height="24px" />
                    <Skeleton width="80px" height="24px" borderRadius="12px" />
                    <Skeleton width="120px" height="20px" />
                  </div>
                )
              ))}
            </div>
          ) : filteredSubjects.length === 0 ? (
            <div className="sl-empty">
              <div className="sl-empty-icon"><SearchX size={48} strokeWidth={1.5} /></div>
              <h3 className="sl-empty-title">No subjects found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button className="sl-clear-btn" onClick={() => { setQuery(''); handleBranchChange('all') }}>
                Clear all filters
              </button>
            </div>
          ) : view === 'grid' ? (
            <div className="sl-grid">
              {filteredSubjects.map((s) => <SubjectCardGrid key={s.subject} subject={s} activeBranchId={branch} />)}
            </div>
          ) : (
            <div className="sl-list">
              {filteredSubjects.map((s) => <SubjectCardList key={s.subject} subject={s} activeBranchId={branch} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Sub-Components ─────────────────────────────── */

function SubjectCardGrid({ subject: s, activeBranchId }) {
  const total = s.years.reduce((a, y) => a + y.files.length, 0)
  const years = s.years.map((y) => y.year).filter((y) => y !== 'Other').sort((a, b) => b - a)
  const fullName = getFullName(s.subject)
  const meta = getSubjectCurriculumMeta(s.subject)
  
  // Highlight logic: if active filter matches one of the branches, highlight it
  const hasActiveBranch = activeBranchId !== 'all' && meta.branches.some(b => b.id === activeBranchId)
  const displayBranches = hasActiveBranch 
    ? meta.branches.filter(b => b.id === activeBranchId) 
    : meta.branches.slice(0, 3)
  
  const mainColor = displayBranches[0]?.color || '#3b82f6'

  return (
    <Link to={`/subject/${encodeURIComponent(s.subject)}`} className="sc-grid" style={{ '--branch-color': mainColor }}>
      <div className="sc-grid-top">
        <div className="sc-abbr">{s.subject}</div>
        <div className="sc-branch-cluster">
          {displayBranches.map(b => (
            <span key={b.id} className="sc-branch-badge-sm" style={{ background: `${b.color}20`, color: b.color }} title={b.label}>
              {b.icon} <span className="sc-branch-label">{b.label}</span>
            </span>
          ))}
          {!hasActiveBranch && meta.branches.length > 3 && (
            <span className="sc-branch-badge-sm" style={{ background: 'var(--card-hover)', color: 'var(--text-muted)' }}>
              +{meta.branches.length - 3}
            </span>
          )}
          {hasActiveBranch && meta.semesters[activeBranchId] && (
            <span className="sc-branch-badge-sm" style={{ background: 'var(--card-hover)', color: 'var(--text-2)' }}>
              Sem {meta.semesters[activeBranchId]}
            </span>
          )}
        </div>
      </div>
      {fullName !== s.subject && <div className="sc-fullname">{fullName}</div>}
      <div className="sc-grid-footer">
        <div className="sc-meta">
          <span className="sc-file-count">{total} files</span>
          {years.length > 0 && <span className="sc-year-range">{years[years.length-1]}–{years[0]}</span>}
        </div>
        <div className="sc-years">
          {years.slice(0, 4).map((y) => <span key={y} className="sc-year">{y}</span>)}
          {years.length > 4 && <span className="sc-year sc-year-more">+{years.length - 4}</span>}
        </div>
      </div>
    </Link>
  )
}

function SubjectCardList({ subject: s, activeBranchId }) {
  const total = s.years.reduce((a, y) => a + y.files.length, 0)
  const years = s.years.map((y) => y.year).filter((y) => y !== 'Other').sort((a, b) => b - a)
  const fullName = getFullName(s.subject)
  const meta = getSubjectCurriculumMeta(s.subject)
  
  const hasActiveBranch = activeBranchId !== 'all' && meta.branches.some(b => b.id === activeBranchId)
  const displayBranches = hasActiveBranch 
    ? meta.branches.filter(b => b.id === activeBranchId) 
    : meta.branches.slice(0, 3)
  
  const mainColor = displayBranches[0]?.color || '#3b82f6'

  return (
    <Link to={`/subject/${encodeURIComponent(s.subject)}`} className="sc-list" style={{ '--branch-color': mainColor }}>
      <div className="sc-list-left">
        <span className="sc-abbr-sm">{s.subject}</span>
        {fullName !== s.subject && <span className="sc-fullname-sm">{fullName}</span>}
      </div>
      <div className="sc-list-mid">
        <div className="sc-branch-cluster">
          {displayBranches.map(b => (
            <span key={b.id} className="sc-branch-badge-sm" style={{ background: `${b.color}15`, color: b.color }} title={b.label}>
              {b.icon} <span className="sc-branch-label">{b.label}</span>
            </span>
          ))}
          {!hasActiveBranch && meta.branches.length > 3 && (
            <span className="sc-branch-badge-sm" style={{ background: 'var(--card-hover)', color: 'var(--text-muted)' }}>
              +{meta.branches.length - 3}
            </span>
          )}
          {hasActiveBranch && meta.semesters[activeBranchId] && (
            <span className="sc-branch-badge-sm" style={{ background: 'var(--card-hover)', color: 'var(--text-2)' }}>
              Sem {meta.semesters[activeBranchId]}
            </span>
          )}
        </div>
      </div>
      <div className="sc-list-right">
        <span className="sc-meta-sm">{total} files</span>
        {years.length > 0 && <span className="sc-meta-sm">{years[years.length-1]}–{years[0]}</span>}
        <ArrowRight size={16} strokeWidth={2} className="sc-list-arrow" />
      </div>
    </Link>
  )
}

function SemesterAccordion({ sem, semRows, program, viewMode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="prog-sem-block">
      {/* Clickable semester header */}
      <button
        className="prog-sem-header prog-sem-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{ '--sem-color': program.color }}
      >
        <div className="prog-sem-label">
          <span className="prog-sem-num" style={{ color: program.color }}>
            {SEM_LABELS[Number(sem)] || `Semester ${sem}`}
          </span>
          <span className="prog-sem-count">{semRows.length} courses</span>
        </div>
        <div className="prog-sem-header-right">
          <div className="prog-sem-type-summary">
            {['Core', 'Core Elective', 'Elective'].map((t) => {
              const cnt = semRows.filter(r => r.course_type === t).length
              if (!cnt) return null
              const ts = TYPE_STYLE[t]
              return (
                <span key={t} className="prog-type-chip" style={{ background: ts.bg, color: ts.fg }}>
                  {cnt} {t}
                </span>
              )
            })}
          </div>
          <span className={`prog-sem-chevron ${open ? 'prog-sem-chevron--open' : ''}`}>
            ›
          </span>
        </div>
      </button>

      {/* Collapsible content */}
      <div className={`prog-sem-body ${open ? 'prog-sem-body--open' : ''}`}>
        {viewMode === 'cards' ? (
          <div className="sl-grid" style={{ padding: '24px', gap: '20px' }}>
            {semRows.map((r, i) => <CourseCard key={i} row={r} branchMeta={program} />)}
          </div>
        ) : (
          <div style={{ padding: '24px' }}>
            <TableView rows={semRows} program={program} />
          </div>
        )}
      </div>
    </div>
  )
}

function CurriculumView({ bySem, program, semFilter, viewMode }) {
  return (
    <div className={`prog-cv-wrap ${semFilter !== 'all' ? 'prog-cv-single' : ''}`}>
      {bySem.map(([sem, semRows]) => (
        <SemesterAccordion key={sem} sem={sem} semRows={semRows} program={program} viewMode={viewMode} />
      ))}
    </div>
  )
}

function CourseCard({ row: r, branchMeta }) {
  const ts = TYPE_STYLE[r.course_type] || TYPE_STYLE['Elective']
  const pyqSubject = resolvePYQ(r.course_code_hint)
  const hasPYQ = !!pyqSubject

  return (
    <div className="sc-grid" style={{ '--branch-color': branchMeta.color, minHeight: '180px', padding: '24px' }}>
      <div className="sc-grid-top">
        <span className="sc-abbr" style={{ fontSize: '1.25rem' }}>{r.course_code_hint || '—'}</span>
        <span className="sc-branch-badge" style={{ background: ts.bg, color: ts.fg, padding: '4px 12px', fontSize: '0.72rem' }}>
          <span className="sc-branch-dot" style={{ background: ts.dot }}></span>
          {r.course_type === 'Core Elective' ? 'Core Elect.' : r.course_type}
        </span>
      </div>
      
      <div className="sc-fullname" style={{ whiteSpace: 'normal', WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', fontSize: '0.95rem', color: 'var(--text)', fontWeight: 600, flex: 1, lineHeight: '1.5', marginTop: '4px', marginBottom: '16px' }}>
        {r.course_name}
      </div>

      <div className="sc-grid-footer" style={{ marginTop: 'auto' }}>
        {hasPYQ ? (
          <Link to={`/subject/${encodeURIComponent(pyqSubject)}`} className="prog-card-pyq-btn" style={{ '--btn-color': branchMeta.color }}>
            View PYQ Archive <ArrowRight size={14} />
          </Link>
        ) : (
          <div className="sc-meta" style={{ opacity: 0.6 }}>
            <span className="sc-file-count">— No PYQs Linked</span>
          </div>
        )}
      </div>
    </div>
  )
}

function TableView({ rows, program }) {
  return (
    <div className="sl-list">
      {rows.map((r, i) => {
        const ts = TYPE_STYLE[r.course_type] || TYPE_STYLE['Elective']
        const pyqSubject = resolvePYQ(r.course_code_hint)

        const content = (
          <>
            <div className="sc-list-left">
              <span className="sc-abbr-sm">{r.course_code_hint || '—'}</span>
              <span className="sc-fullname-sm">{r.course_name}</span>
            </div>
            <div className="sc-list-mid">
              <div className="sc-branch-cluster">
                <span className="sc-branch-badge-sm" style={{ background: ts.bg, color: ts.fg }}>
                  {r.course_type === 'Core Elective' ? 'Core Elect.' : r.course_type}
                </span>
                <span className="sc-branch-badge-sm" style={{ background: 'var(--card-hover)', color: 'var(--text-2)' }}>
                  Sem {r.semester}
                </span>
              </div>
            </div>
            <div className="sc-list-right">
              {pyqSubject ? (
                <>
                  <span className="sc-meta-sm" style={{ color: program.color, fontWeight: 600 }}>View PYQs</span>
                  <ArrowRight size={16} strokeWidth={2} className="sc-list-arrow" />
                </>
              ) : (
                <span className="sc-meta-sm" style={{ opacity: 0.5 }}>No PYQs Linked</span>
              )}
            </div>
          </>
        )

        return pyqSubject ? (
          <Link key={i} to={`/subject/${encodeURIComponent(pyqSubject)}`} className="sc-list" style={{ '--branch-color': program.color }}>
            {content}
          </Link>
        ) : (
          <div key={i} className="sc-list" style={{ '--branch-color': program.color, cursor: 'default' }}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
