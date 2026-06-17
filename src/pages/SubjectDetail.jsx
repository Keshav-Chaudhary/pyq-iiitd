import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Share2, Check } from 'lucide-react'
import courseData from '../courseData.json'
import { getBranch, getFullName, getSubjectCode, BRANCHES, getSubjectCurriculumMeta } from '../data/branchMap'
import NotFound from './NotFound'
import { useToast } from '../context/ToastContext'
import '../styles/SubjectDetail.css'

const EXT_ICON = { pdf:'📄', docx:'📝', doc:'📝', jpg:'🖼️', jpeg:'🖼️', png:'🖼️', zip:'🗜️', txt:'📃' }
const getIcon = (t) => EXT_ICON[t?.toLowerCase()] || '📎'

function getFileUrl(filePath) {
  return `https://raw.githubusercontent.com/NalishJain/IIITD-PYQs/main/${filePath.split('/').map(encodeURIComponent).join('/')}`
}

// Categorise file names into types
function categorise(name) {
  const n = name.toLowerCase()
  if (n.includes('endsem') || n.includes('end-sem') || n.includes('end_sem')) return 'End Sem'
  if (n.includes('midsem') || n.includes('mid-sem') || n.includes('mid_sem')) return 'Mid Sem'
  if (n.includes('quiz'))   return 'Quiz'
  if (n.includes('tut'))    return 'Tutorial'
  if (n.includes('assign') || n.includes('hw') || n.includes('homework')) return 'Assignment'
  if (n.includes('soln') || n.includes('solution') || n.includes('rubric') || n.includes('answer')) return 'Solution'
  return 'Other'
}

const CAT_COLORS = {
  'End Sem':   { bg: 'rgba(239,68,68,0.12)',   fg: '#f87171' },
  'Mid Sem':   { bg: 'rgba(245,158,11,0.12)',  fg: '#fbbf24' },
  'Quiz':      { bg: 'rgba(99,102,241,0.12)',  fg: '#a5b4fc' },
  'Tutorial':  { bg: 'rgba(16,185,129,0.12)',  fg: '#6ee7b7' },
  'Assignment':{ bg: 'rgba(59,130,246,0.12)',  fg: '#93c5fd' },
  'Solution':  { bg: 'rgba(168,85,247,0.12)',  fg: '#d8b4fe' },
  'Other':     { bg: 'rgba(100,116,139,0.12)', fg: '#94a3b8' },
}

export default function SubjectDetail() {
  const { subjectName } = useParams()
  const { addToast } = useToast()
  const decoded = decodeURIComponent(subjectName)
  const subject = courseData.find((s) => s.subject === decoded)

  const [selectedYear, setSelectedYear] = useState('all')
  const [search, setSearch]             = useState('')
  const [catFilter, setCatFilter]       = useState('all')
  const [isShared, setIsShared]         = useState(false)

  if (!subject) {
    return <NotFound />
  }

  const handleShare = async () => {
    const url = window.location.href;

    const onSuccess = () => {
      addToast('Link copied to clipboard!', 'success');
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }

    // Try native share first (best for mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IIITD PYQs',
          url: url
        });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error("Share failed:", err);
      }
    }

    // Modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url)
        .then(onSuccess)
        .catch(() => addToast('Failed to copy link', 'error'))
    } else {
      // Fallback for insecure contexts (like testing on local IP)
      try {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          onSuccess();
        } else {
          addToast('Failed to copy link', 'error');
        }
      } catch (err) {
        addToast('Failed to copy link', 'error');
      }
    }
  }

  const meta       = getSubjectCurriculumMeta(subject.subject)
  const fullName   = getFullName(subject.subject)
  const courseCode = getSubjectCode(subject.subject)
  const totalFiles = subject.years.reduce((a, y) => a + y.files.length, 0)

  const years = subject.years
    .map((y) => y.year)
    .filter((y) => y !== 'Other')
    .sort((a, b) => b - a)
  const allYears = [...years, ...(subject.years.find((y) => y.year === 'Other') ? ['Other'] : [])]

  // All categories present
  const allCats = ['all', ...Array.from(new Set(
    subject.years.flatMap((yr) => yr.files.map((f) => categorise(f.name)))
  ))]

  const displayYears = selectedYear === 'all'
    ? subject.years
    : subject.years.filter((y) => y.year === selectedYear)

  const filteredYears = displayYears.map((yr) => ({
    ...yr,
    files: yr.files.filter((f) => {
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
      const matchCat    = catFilter === 'all' || categorise(f.name) === catFilter
      return matchSearch && matchCat
    }),
  })).filter((yr) => yr.files.length > 0)

  const totalShown = filteredYears.reduce((a, y) => a + y.files.length, 0)

  return (
    <div className="sd-page">

      {/* Header */}
      <div className="sd-header">
        <div className="sd-header-glow"></div>
        <div className="container">
          <div className="flex-between">
            <Link to="/subjects" className="sd-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              All Subjects
            </Link>
            <button onClick={handleShare} className="sd-share-btn-top" aria-label="Share URL" title="Copy Link" style={{ width: '90px' }}>
              {isShared ? <Check size={16} strokeWidth={2.5} color="var(--success)" /> : <Share2 size={16} strokeWidth={2.5} />}
              <span style={{ color: isShared ? 'var(--success)' : 'inherit' }}>{isShared ? 'Copied!' : 'Share'}</span>
            </button>
          </div>

          <div className="sd-title-row animate-fadeup" style={{ animationDelay: '0.1s' }}>
            <div>
              <div className="sd-title-top">
                <h1 className="sd-title sd-title-gradient">{subject.subject}</h1>
                <div className="sd-branch-cluster">
                  {meta.branches.map(b => (
                    <span key={b.id} className="sd-branch-tag" style={{ background: `${b.color}22`, color: b.color }} title={b.label}>
                      {b.icon} {b.label}
                    </span>
                  ))}
                </div>
              </div>
              {(fullName !== subject.subject || courseCode) && (
                <p className="sd-fullname">
                  {[fullName !== subject.subject ? fullName : null, courseCode].filter(Boolean).join(' • ')}
                </p>
              )}
            </div>
            <div className="sd-header-stats">
              <div className="sd-hstat">
                <div className="sd-hstat-num">{totalFiles}</div>
                <div className="sd-hstat-label">Total Files</div>
              </div>
              <div className="sd-hstat">
                <div className="sd-hstat-num">{years.length}</div>
                <div className="sd-hstat-label">Years</div>
              </div>
            </div>
          </div>

          {/* Year chips */}
          <div className="sd-year-chips animate-fadeup" style={{ animationDelay: '0.2s' }}>
            {allYears.map((y) => (
              <span key={y} className="sd-year-chip">{y}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="container sd-body">

        {/* Year filter */}
        <div className="sd-year-filter animate-fadeup" style={{ animationDelay: '0.3s' }} role="group" aria-label="Filter by year">
          <button
            className={`sd-year-btn ${selectedYear === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedYear('all')}
          >All</button>
          {allYears.map((y) => (
            <button
              key={y}
              className={`sd-year-btn ${selectedYear === y ? 'active' : ''}`}
              onClick={() => setSelectedYear(y)}
            >{y}</button>
          ))}
        </div>

        {/* Category + search */}
        <div className="sd-controls animate-fadeup" style={{ animationDelay: '0.4s' }}>
          <div className="sd-cat-filter" role="group" aria-label="Filter by type">
            {allCats.map((cat) => {
              const c = CAT_COLORS[cat]
              return (
                <button
                  key={cat}
                  className={`sd-cat-btn ${catFilter === cat ? 'active' : ''}`}
                  style={catFilter === cat && c ? { background: c.bg, color: c.fg, borderColor: c.fg } : {}}
                  onClick={() => setCatFilter(cat)}
                >
                  {cat === 'all' ? 'All Types' : cat}
                </button>
              )
            })}
          </div>

          <div className="sd-search-wrap">
            <svg className="sd-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="sd-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter files..."
              aria-label="Filter files"
            />
            {search && (
              <button className="sd-search-clear" onClick={() => setSearch('')} aria-label="Clear">✕</button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="sd-results-info animate-fadeup" style={{ animationDelay: '0.5s' }}>
          Showing <strong>{totalShown}</strong> of <strong>{totalFiles}</strong> files
        </div>

        {/* Files */}
        {filteredYears.length === 0 ? (
          <div className="sd-empty">No files match your filters.</div>
        ) : (
          <div className="sd-accordion-list">
            {filteredYears.map((yr, idx) => (
              <YearAccordion key={yr.year} yr={yr} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function YearAccordion({ yr, index }) {
  const [open, setOpen] = useState(false)
  const delay = `${0.6 + (index * 0.1)}s`

  return (
    <div className="sd-year-section animate-fadeup" style={{ animationDelay: delay }}>
      <button 
        className="sd-year-header" 
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 className="sd-year-title">{yr.year}</h2>
          <span className="sd-year-count">{yr.files.length} files</span>
        </div>
        <span className={`sd-year-chevron ${open ? 'sd-year-chevron--open' : ''}`}>›</span>
      </button>

      <div className={`sd-year-body ${open ? 'sd-year-body--open' : ''}`}>
        <div className="sd-year-body-inner">
          <div className="sd-files">
            {yr.files.map((file, idx) => {
              const cat = categorise(file.name)
              const catColor = CAT_COLORS[cat]
              const url = getFileUrl(file.path)
              return (
                <div key={idx} className="sd-file">
                  <span className="sd-file-icon">{getIcon(file.type)}</span>
                  <div className="sd-file-info">
                    <span className="sd-file-name">{file.name}</span>
                    <div className="sd-file-tags">
                      <span className={`ftag ftag-${file.type?.toLowerCase()}`}>{file.type?.toUpperCase()}</span>
                      <span className="sd-cat-tag" style={{ background: catColor?.bg, color: catColor?.fg }}>
                        {cat}
                      </span>
                    </div>
                  </div>
                  <div className="sd-file-actions">
                    {file.type?.toLowerCase() === 'pdf' ? (
                      <Link to={`/view-pdf?file=${encodeURIComponent(url)}&name=${encodeURIComponent(file.name)}`} className="sd-btn sd-btn-view">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        View
                      </Link>
                    ) : (
                      <a href={url} target="_blank" rel="noreferrer" className="sd-btn sd-btn-view">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        View
                      </a>
                    )}
                    <a href={url} download={file.name} className="sd-btn sd-btn-dl" title="Download">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
