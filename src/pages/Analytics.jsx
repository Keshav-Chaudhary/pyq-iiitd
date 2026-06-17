import { useMemo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, FileText, Calendar, GraduationCap, BarChart3, Clock, Layers, TrendingUp, BarChart2 } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts'
import courseData from '../courseData.json'
import Skeleton from '../components/Skeleton'
import { BRANCHES, getBranch } from '../data/branchMap'
import '../styles/Analytics.css'

export default function Analytics() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [yearChartType, setYearChartType] = useState('bar')
  
  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const stats = useMemo(() => {
    const totalFiles = courseData.reduce((s, c) => s + c.years.reduce((a, y) => a + y.files.length, 0), 0)

    // Files per branch
    const byBranch = {}
    BRANCHES.filter((b) => b.id !== 'all').forEach((b) => { byBranch[b.id] = { count: 0, subjects: 0, color: b.color, icon: b.icon, label: b.label } })
    courseData.forEach((s) => {
      const b = getBranch(s.subject)
      if (byBranch[b]) {
        byBranch[b].count += s.years.reduce((a, y) => a + y.files.length, 0)
        byBranch[b].subjects++
      }
    })

    // Files per year
    const byYear = {}
    courseData.forEach((s) => s.years.forEach((yr) => {
      if (yr.year !== 'Other') {
        byYear[yr.year] = (byYear[yr.year] || 0) + yr.files.length
      }
    }))

    // Top subjects by file count
    const topSubjects = courseData
      .map((s) => ({ subject: s.subject, count: s.years.reduce((a, y) => a + y.files.length, 0) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Most comprehensive subjects (span most years)
    const comprehensiveSubjects = courseData
      .map((s) => ({ subject: s.subject, yearCount: s.years.filter(y => y.year !== 'Other').length, totalFiles: s.years.reduce((a, y) => a + y.files.length, 0) }))
      .sort((a, b) => b.yearCount - a.yearCount || b.totalFiles - a.totalFiles)
      .slice(0, 8)

    // File type breakdown
    const byType = {}
    courseData.forEach((s) => s.years.forEach((yr) => yr.files.forEach((f) => {
      const t = (f.type || 'other').toLowerCase()
      byType[t] = (byType[t] || 0) + 1
    })))

    // Years sorted
    const yearsSorted = Object.entries(byYear).sort((a, b) => a[0].localeCompare(b[0]))

    // Additional derived metrics
    const avgFilesPerSubject = Math.round(totalFiles / courseData.length)
    
    let mostActiveBranch = { label: 'None', count: 0 }
    Object.values(byBranch).forEach(b => {
      if (b.count > mostActiveBranch.count) mostActiveBranch = b
    })

    const latestYearObj = yearsSorted.length > 0 ? yearsSorted[yearsSorted.length - 1] : ['N/A', 0]

    return { 
      totalFiles, byBranch, topSubjects, byType, yearsSorted, comprehensiveSubjects,
      avgFilesPerSubject, mostActiveBranch, latestYearObj
    }
  }, [])

  const maxBranchCount = Math.max(...Object.values(stats.byBranch).map((b) => b.count))
  const maxYearCount   = Math.max(...stats.yearsSorted.map(([, v]) => v))
  const maxSubjCount   = stats.topSubjects[0]?.count || 1
  const maxCompYearCount = stats.comprehensiveSubjects[0]?.yearCount || 1

  const TYPE_COLORS = {
    pdf: '#ef4444', docx: '#3b82f6', doc: '#3b82f6',
    jpg: '#10b981', jpeg: '#10b981', png: '#10b981',
    zip: '#f59e0b', txt: '#8b5cf6',
  }

  return (
    <div className="an-page">
      {/* Header */}
      <div className="an-header">
        <div className="an-header-glow" aria-hidden="true" />
        <div className="container">
          <h1 className="an-title"><span className="an-title-gradient">Repository Analytics</span></h1>
          <p className="an-sub">Deep dive into {stats.totalFiles}+ academic resources across {courseData.length} subjects.</p>
        </div>
      </div>

      <div className="container an-body">
        {/* Top Dashboard Row (2 Columns) */}
        <div className="dashboard-top-row">
          {/* KPI grid */}
          <div className="kpi-grid">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={`sk-kpi-${i}`} className="kpi-card" style={{ padding: '20px' }}>
                  <Skeleton width="36px" height="36px" borderRadius="10px" className="mb-3" />
                  <Skeleton width="50%" height="28px" className="mb-2" />
                  <Skeleton width="40%" height="16px" />
                </div>
              ))
            ) : (
              [
                { label: 'Total Files',    value: `${stats.totalFiles}+`, icon: <FileText size={18} strokeWidth={2.5} /> },
                { label: 'Total Subjects', value: courseData.length, icon: <BookOpen size={18} strokeWidth={2.5} /> },
                { label: 'Branches',       value: Object.keys(stats.byBranch).length, icon: <GraduationCap size={18} strokeWidth={2.5} /> },
                { label: 'Avg Files / Subj', value: stats.avgFilesPerSubject, icon: <BarChart3 size={18} strokeWidth={2.5} /> },
                { label: 'Top Branch',     value: stats.mostActiveBranch.label, icon: <Layers size={18} strokeWidth={2.5} />, subValue: `${stats.mostActiveBranch.count} files` },
                { label: `Added in ${stats.latestYearObj[0]}`, value: stats.latestYearObj[1], icon: <Clock size={18} strokeWidth={2.5} />, subValue: 'Latest Year' },
              ].map((k, i) => (
                <div key={k.label} className="kpi-card" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="kpi-icon">{k.icon}</div>
                  <div className="kpi-value" style={{ fontSize: typeof k.value === 'string' && k.value.length > 5 ? '1.15rem' : '1.4rem' }}>{k.value}</div>
                  <div className="kpi-label">{k.label}</div>
                  {k.subValue && <div className="kpi-sublabel">{k.subValue}</div>}
                </div>
              ))
            )}
          </div>

          {/* Files per year */}
          <div className="an-card an-card-year" style={{ animationDelay: '200ms', height: '100%' }}>
            {loading ? (
              <div style={{ padding: '4px' }}>
                <div className="flex-between mb-4">
                  <Skeleton width="200px" height="24px" />
                  <Skeleton width="70px" height="32px" borderRadius="16px" />
                </div>
                <Skeleton width="100%" height="260px" borderRadius="12px" />
              </div>
            ) : (
              <>
                <div className="flex-between">
                  <h2 className="an-card-title m-0"><Calendar size={20} className="mr-2 text-primary" /> Files Added per Year</h2>
                  <div className="chart-toggle">
                    <button className={`chart-t-btn ${yearChartType === 'bar' ? 'active' : ''}`} onClick={() => setYearChartType('bar')} title="Bar Chart"><BarChart2 size={16} /></button>
                    <button className={`chart-t-btn ${yearChartType === 'line' ? 'active' : ''}`} onClick={() => setYearChartType('line')} title="Detailed Line Graph"><TrendingUp size={16} /></button>
                  </div>
                </div>
                
                {yearChartType === 'bar' ? (
                  <div className="year-chart-hero">
                    {stats.yearsSorted.map(([year, count], idx) => {
                      const prevCount = idx > 0 ? stats.yearsSorted[idx - 1][1] : count
                      const growth = prevCount ? Math.round(((count - prevCount) / prevCount) * 100) : 0
                      return (
                        <div key={year} className="year-col-hero">
                          <div className="year-bar-wrap-hero" title={`${year}: ${count} files (${growth > 0 ? '+' : ''}${growth}% YoY)`}>
                            <motion.div
                              className="year-bar-hero"
                              initial={{ height: 0 }}
                              animate={{ height: Math.max(4, (count / maxYearCount) * 220) }}
                              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </div>
                          <div className="year-bar-label-hero">{year.slice(2)}</div>
                          <div className="year-bar-count-hero">{count}</div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="year-line-hero" style={{ height: 260, marginTop: 24, paddingRight: 20 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats.yearsSorted.map(([year, count]) => ({ year, count }))}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary-light)" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="var(--primary-light)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                        <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: 'rgba(19, 19, 26, 0.8)', backdropFilter: 'blur(12px)', borderColor: 'var(--border-2)', borderRadius: '8px', color: 'var(--text)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
                          itemStyle={{ color: 'var(--primary-light)', fontWeight: 'bold' }}
                          labelStyle={{ color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="count" name="Files Added" stroke="var(--primary-light)" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" activeDot={{ r: 6, fill: 'var(--bg)', stroke: 'var(--primary-light)', strokeWidth: 2 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="an-grid-asymmetric">

          {/* Files by Branch */}
          <div className="an-card" style={{ animationDelay: '250ms' }}>
            {loading ? (
              <div>
                <Skeleton width="180px" height="24px" className="mb-4" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} width="100%" height="32px" className="mb-3" borderRadius="6px" />
                ))}
              </div>
            ) : (
              <>
                <h2 className="an-card-title"><Layers size={20} className="mr-2 text-primary" /> Files by Branch</h2>
                <div className="bar-chart">
                  {Object.entries(stats.byBranch)
                    .sort((a, b) => b[1].count - a[1].count)
                    .map(([id, data]) => (
                      <div key={id} className="bar-row">
                        <div className="bar-label">
                          <span>{data.icon}</span>
                          <span>{data.label}</span>
                          <span className="bar-subjects">{data.subjects} subj.</span>
                        </div>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{
                              width: mounted ? `${(data.count / maxBranchCount) * 100}%` : '0%',
                              background: data.color,
                            }}
                          />
                        </div>
                        <span className="bar-value">{data.count}</span>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* Comprehensive Subjects */}
          <div className="an-card" style={{ animationDelay: '300ms' }}>
            {loading ? (
              <div>
                <Skeleton width="220px" height="24px" className="mb-2" />
                <Skeleton width="160px" height="14px" className="mb-4" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} width="100%" height="32px" className="mb-3" borderRadius="6px" />
                ))}
              </div>
            ) : (
              <>
                <h2 className="an-card-title"><Clock size={20} className="mr-2 text-primary" /> Most Comprehensive Subjects</h2>
                <p className="an-card-desc mb-3 text-sm text-muted">Subjects spanning the most distinct years.</p>
                <div className="top-list">
                  {stats.comprehensiveSubjects.map((s, i) => (
                    <Link key={s.subject} to={`/subject/${encodeURIComponent(s.subject)}`} className="top-row">
                      <span className="top-rank">#{i + 1}</span>
                      <span className="top-name">{s.subject}</span>
                      <div className="top-bar-track">
                        <div className="top-bar-fill" style={{ width: mounted ? `${(s.yearCount / maxCompYearCount) * 100}%` : '0%' }} />
                      </div>
                      <span className="top-count">{s.yearCount} yrs</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Top subjects by volume */}
          <div className="an-card" style={{ animationDelay: '350ms' }}>
            {loading ? (
              <div>
                <Skeleton width="220px" height="24px" className="mb-2" />
                <Skeleton width="160px" height="14px" className="mb-4" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} width="100%" height="32px" className="mb-3" borderRadius="6px" />
                ))}
              </div>
            ) : (
              <>
                <h2 className="an-card-title"><BookOpen size={20} className="mr-2 text-primary" /> Highest Volume Subjects</h2>
                <p className="an-card-desc mb-3 text-sm text-muted">Subjects with the most total files.</p>
                <div className="top-list">
                  {stats.topSubjects.slice(0, 8).map((s, i) => (
                    <Link key={s.subject} to={`/subject/${encodeURIComponent(s.subject)}`} className="top-row">
                      <span className="top-rank">#{i + 1}</span>
                      <span className="top-name">{s.subject}</span>
                      <div className="top-bar-track">
                        <div className="top-bar-fill" style={{ width: mounted ? `${(s.count / maxSubjCount) * 100}%` : '0%' }} />
                      </div>
                      <span className="top-count">{s.count}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* File types */}
          <div className="an-card an-card-wide" style={{ animationDelay: '400ms' }}>
            {loading ? (
              <div>
                <Skeleton width="200px" height="24px" className="mb-4" />
                <div className="type-list type-list-grid">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} width="100%" height="36px" borderRadius="6px" />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <h2 className="an-card-title"><FileText size={20} className="mr-2 text-primary" /> File Types Distribution</h2>
                <div className="type-list type-list-grid">
                  {Object.entries(stats.byType)
                    .sort((a, b) => b[1] - a[1])
                    .map(([type, count]) => {
                      const pct = Math.round((count / stats.totalFiles) * 100)
                      return (
                        <div key={type} className="type-row">
                          <div className="type-info">
                            <span className={`ftag ftag-${type}`}>{type.toUpperCase()}</span>
                            <span className="type-count">{count} files</span>
                          </div>
                          <div className="type-bar-track">
                            <div
                              className="type-bar-fill"
                              style={{ width: mounted ? `${pct}%` : '0%', background: TYPE_COLORS[type] || '#64748b' }}
                            />
                          </div>
                          <span className="type-pct">{pct}%</span>
                        </div>
                      )
                    })}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
