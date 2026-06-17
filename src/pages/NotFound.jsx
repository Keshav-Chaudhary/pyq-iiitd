import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, Compass, Ghost } from 'lucide-react'
import '../styles/NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound-page">
      {/* Background Effects */}
      <div className="notfound-grid-bg" aria-hidden="true" />
      <div className="notfound-glow-1" aria-hidden="true" />
      <div className="notfound-glow-2" aria-hidden="true" />
      
      {/* Floating abstract elements */}
      <motion.div className="nf-float-icon nf-icon-1" animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
        <Ghost size={48} strokeWidth={1} />
      </motion.div>
      <motion.div className="nf-float-icon nf-icon-2" animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}>
        <Compass size={64} strokeWidth={1} />
      </motion.div>

      <div className="container notfound-inner">
        <motion.div 
          className="notfound-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="notfound-massive-text">
            <span>4</span>
            <span className="nf-glitch">0</span>
            <span>4</span>
          </div>
          
          <h2 className="notfound-subtitle">Lost in the Archive</h2>
          
          <p className="notfound-desc">
            The paper you are looking for has either been deleted, moved, or never existed in this dimension.
          </p>
          
          <div className="notfound-actions">
            <Link to="/" className="nf-btn nf-btn-primary">
              <Home size={18} strokeWidth={2} />
              Return to Base
            </Link>
            <Link to="/subjects" className="nf-btn nf-btn-glass">
              <Search size={18} strokeWidth={2} />
              Search the Hub
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
