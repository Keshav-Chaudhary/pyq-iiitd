import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Shield, FileText, Cookie, AlertTriangle, Copyright, Scale } from 'lucide-react'
import '../styles/Legal.css'

const policies = [
  { id: 'privacy', label: 'Privacy Policy', icon: Shield },
  { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  { id: 'cookie', label: 'Cookie Policy', icon: Cookie },
  { id: 'disclaimer', label: 'Disclaimer', icon: AlertTriangle },
  { id: 'copyright', label: 'Copyright Notice', icon: Copyright },
  { id: 'dmca', label: 'DMCA Policy', icon: Scale },
]

export default function Legal() {
  const { hash } = useLocation()
  const [activeTab, setActiveTab] = useState('privacy')

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      if (policies.some(p => p.id === id)) {
        setActiveTab(id)
        window.scrollTo(0, 0)
      }
    }
  }, [hash])

  const renderContent = () => {
    switch (activeTab) {
      case 'privacy':
        return (
          <div className="legal-doc animate-fadeup">
            <div className="legal-doc-header">
              <div className="legal-doc-icon"><Shield size={32} strokeWidth={2} /></div>
              <div>
                <h2>Privacy Policy</h2>
                <p className="legal-updated">Last Updated: May 2026</p>
              </div>
            </div>
            <p className="legal-intro">At IIITD PYQ's By Kc, your privacy is our priority. Since this is a free, open-source repository designed solely to serve the student community, we collect practically zero personal data.</p>
            
            <div className="legal-section-grid">
              <div className="legal-section-card">
                <h3>1. Information We Collect</h3>
                <p>We do not require you to create an account, log in, or provide any personal details to browse or download the exam papers. We do not use any invasive tracking scripts.</p>
              </div>
              <div className="legal-section-card">
                <h3>2. How We Use Information</h3>
                <p>If we implement basic analytics (such as Google Analytics or Vercel Web Analytics) to understand which courses are most popular and ensure the site remains fast and stable, this data is aggregated and completely anonymized.</p>
              </div>
              <div className="legal-section-card">
                <h3>3. Third-Party Links</h3>
                <p>Our website contains links to GitHub and official IIITD pages. Please note that these external sites have their own privacy policies, and we do not accept any responsibility or liability for their policies.</p>
              </div>
            </div>
          </div>
        )
      case 'terms':
        return (
          <div className="legal-doc animate-fadeup">
            <div className="legal-doc-header">
              <div className="legal-doc-icon"><FileText size={32} strokeWidth={2} /></div>
              <div>
                <h2>Terms & Conditions</h2>
                <p className="legal-updated">Last Updated: May 2026</p>
              </div>
            </div>
            
            <div className="legal-section-grid">
              <div className="legal-section-card">
                <h3>1. Introduction</h3>
                <p>Welcome to IIITD PYQ's By Kc. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use.</p>
              </div>
              <div className="legal-section-card">
                <h3>2. Use of Content</h3>
                <p>The content provided on this website is for educational, non-commercial purposes only. It is intended to help students prepare for their examinations by providing access to past year question papers.</p>
              </div>
              <div className="legal-section-card">
                <h3>3. User Responsibilities</h3>
                <p>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>
              </div>
              <div className="legal-section-card">
                <h3>4. Open Source Contributions</h3>
                <p>Contributions made to the underlying GitHub repository are subject to the repository's licensing terms. By submitting a pull request, you affirm you have the right to share the contributed material.</p>
              </div>
            </div>
          </div>
        )
      case 'cookie':
        return (
          <div className="legal-doc animate-fadeup">
            <div className="legal-doc-header">
              <div className="legal-doc-icon"><Cookie size={32} strokeWidth={2} /></div>
              <div>
                <h2>Cookie Policy</h2>
                <p className="legal-updated">Last Updated: May 2026</p>
              </div>
            </div>
            
            <div className="legal-section-grid">
              <div className="legal-section-card">
                <h3>1. What are Cookies?</h3>
                <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience.</p>
              </div>
              <div className="legal-section-card">
                <h3>2. How We Use Local Storage & Caching</h3>
                <p>IIITD PYQ's By Kc is a Progressive Web App (PWA). We do not use cookies for advertising or invasive tracking. Instead, we use your browser's local storage and Service Workers to cache website files strictly to enable blazing fast performance and offline accessibility. We also save essential preferences like your dark/light theme.</p>
              </div>
              <div className="legal-section-card">
                <h3>3. Managing Cookies</h3>
                <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. Since we only use functional local storage for theme preferences, disabling cookies will simply reset your theme to the default.</p>
              </div>
            </div>
          </div>
        )
      case 'disclaimer':
        return (
          <div className="legal-doc animate-fadeup">
            <div className="legal-doc-header">
              <div className="legal-doc-icon"><AlertTriangle size={32} strokeWidth={2} /></div>
              <div>
                <h2>Disclaimer</h2>
                <p className="legal-updated">Last Updated: May 2026</p>
              </div>
            </div>
            
            <div className="legal-section-grid">
              <div className="legal-section-card">
                <h3>1. Educational Purposes Only</h3>
                <p>All materials shared on IIITD PYQ's By Kc are provided by students for educational and reference purposes only. The past year questions, quizzes, and solutions are not official institute material unless stated otherwise.</p>
              </div>
              <div className="legal-section-card">
                <h3>2. Accuracy of Information</h3>
                <p>While we strive to keep the repository updated and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the papers provided.</p>
              </div>
              <div className="legal-section-card">
                <h3>3. Limitation of Liability</h3>
                <p>In no event will IIITD PYQ's By Kc or its contributors be liable for any loss or damage including without limitation, indirect or consequential loss or damage, arising out of, or in connection with, the use of this website.</p>
              </div>
            </div>
          </div>
        )
      case 'copyright':
        return (
          <div className="legal-doc animate-fadeup">
            <div className="legal-doc-header">
              <div className="legal-doc-icon"><Copyright size={32} strokeWidth={2} /></div>
              <div>
                <h2>Copyright Notice</h2>
                <p className="legal-updated">Last Updated: May 2026</p>
              </div>
            </div>
            
            <p className="legal-intro"><strong>© 2026 IIITD PYQ's By Kc. All Rights Reserved.</strong></p>
            
            <div className="legal-section-grid">
              <div className="legal-section-card">
                <h3>Site Design & Ownership</h3>
                <p>The website design, layout, look, appearance, and graphics are the property of IIITD PYQ's By Kc and its developer, <a href="https://github.com/Keshav-Chaudhary" target="_blank" rel="noreferrer">Keshav Chaudhary</a>.</p>
              </div>
              <div className="legal-section-card">
                <h3>Academic Materials</h3>
                <p>The question papers, quizzes, and academic materials hosted in the linked GitHub repository belong to their respective original authors (IIITD faculty) or the students who transcribed them. This platform simply aggregates publicly available, student-shared resources for non-commercial, educational use.</p>
              </div>
            </div>
          </div>
        )
      case 'dmca':
        return (
          <div className="legal-doc animate-fadeup">
            <div className="legal-doc-header">
              <div className="legal-doc-icon"><Scale size={32} strokeWidth={2} /></div>
              <div>
                <h2>DMCA Policy</h2>
                <p className="legal-updated">Last Updated: May 2026</p>
              </div>
            </div>
            
            <div className="legal-section-grid">
              <div className="legal-section-card">
                <h3>Reporting Copyright Infringement</h3>
                <p>If you are a copyright owner (e.g., a faculty member) and believe that any material on this site or the associated GitHub repository infringes upon your copyrights, you may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA).</p>
              </div>
              <div className="legal-section-card">
                <h3>How to Request Removal</h3>
                <p>Please open an issue directly on our <a href="https://github.com/NalishJain/IIITD-PYQs" target="_blank" rel="noreferrer">GitHub Repository</a> requesting the removal of the specific file, or contact the developer directly via GitHub.</p>
                <p style={{marginTop: '12px'}}>Upon receipt of a valid removal request, the material will be promptly removed from the repository, which will instantly reflect on this website.</p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="legal-page">
      <div className="legal-header">
        <div className="legal-header-glow"></div>
        <div className="container">
          <h1 className="legal-title-gradient">Legal & Policies</h1>
          <p>Everything you need to know about our open-source commitment</p>
        </div>
      </div>
      
      <div className="container legal-body">
        <div className="legal-layout">
          {/* Sidebar */}
          <aside className="legal-sidebar">
            <nav className="legal-nav">
              {policies.map((policy) => {
                const Icon = policy.icon
                return (
                  <button
                    key={policy.id}
                    className={`legal-nav-item ${activeTab === policy.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(policy.id)
                      window.history.pushState(null, '', `#${policy.id}`)
                    }}
                  >
                    <Icon size={18} strokeWidth={2.5} />
                    {policy.label}
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Content Area */}
          <main className="legal-content-area">
            <div key={activeTab}>
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
