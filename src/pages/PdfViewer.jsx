import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ChevronLeft, Download, Loader2 } from 'lucide-react'
import '../styles/Skeleton.css'
import '../styles/PdfViewer.css'

export default function PdfViewer() {
  const [searchParams] = useSearchParams()
  const fileUrl = searchParams.get('file')
  const fileName = searchParams.get('name') || 'Document.pdf'
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  if (!fileUrl) {
    return (
      <div className="pdf-viewer-page">
        <div className="pdf-error">No PDF URL provided.</div>
      </div>
    )
  }

  // Google PDF Viewer requires a public URL. Since these are from raw.githubusercontent.com, they are public.
  const googleViewerUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(fileUrl)}`

  return (
    <div className="pdf-viewer-page animate-fadeup" style={{ animationDelay: '0.1s' }}>
      {/* Top Header Controls Bar */}
      <div className="pdf-control-bar">
        <div className="pdf-ctrl-left">
          <button className="pdf-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
            <ChevronLeft size={16} strokeWidth={2.5} />
            <span className="pdf-back-text">Back</span>
          </button>
          <div className="pdf-title-text" title={fileName}>
            {fileName}
          </div>
        </div>

        <div className="pdf-ctrl-right">
          <a href={fileUrl} download={fileName} className="pdf-btn-icon" aria-label="Download Original PDF" title="Download Original PDF">
            <Download size={16} />
          </a>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="pdf-workspace">
        {isLoading && (
          <div className="skeleton-loader" style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            zIndex: 10
          }}>
            <div style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Loader2 className="animate-spin" size={40} style={{ marginBottom: '16px', color: 'var(--primary)' }} />
              <p style={{ color: 'var(--text)', fontSize: '1.1rem', fontWeight: 500 }}>Loading PDF Document...</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', opacity: 0.8, marginTop: '8px' }}>Large files may take a moment</p>
            </div>
          </div>
        )}
        <iframe 
          src={googleViewerUrl} 
          className="pdf-iframe"
          title={fileName}
          frameBorder="0"
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
    </div>
  )
}
