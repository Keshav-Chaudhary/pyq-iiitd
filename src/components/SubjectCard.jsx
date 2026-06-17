import { Link } from 'react-router-dom'
import '../styles/SubjectCard.css'

export default function SubjectCard({ subject }) {
  const totalFiles = subject.years.reduce((sum, y) => sum + y.files.length, 0)
  const years = subject.years.map((y) => y.year).filter((y) => y !== 'Other').sort((a, b) => b - a)
  const latestYear = years[0] || 'N/A'

  return (
    <Link to={`/subject/${encodeURIComponent(subject.subject)}`} className="subject-card">
      <div className="subject-card-header">
        <span className="subject-abbr">{subject.subject}</span>
        <span className="subject-file-count">{totalFiles} files</span>
      </div>
      <div className="subject-card-meta">
        <span className="meta-item">
          <span className="meta-label">Years:</span>
          <span className="meta-value">{years.length > 0 ? `${years[years.length - 1]}–${latestYear}` : 'N/A'}</span>
        </span>
        <span className="meta-item">
          <span className="meta-label">Latest:</span>
          <span className="meta-value">{latestYear}</span>
        </span>
      </div>
      <div className="subject-card-years">
        {years.slice(0, 5).map((y) => (
          <span key={y} className="year-chip">{y}</span>
        ))}
        {years.length > 5 && <span className="year-chip year-more">+{years.length - 5}</span>}
      </div>
    </Link>
  )
}
