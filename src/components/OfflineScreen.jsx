import React from 'react'
import { motion } from 'framer-motion'
import { WifiOff, RefreshCw } from 'lucide-react'
import '../styles/OfflineScreen.css'

export default function OfflineScreen() {
  return (
    <div className="offline-page">
      <div className="offline-grid-bg" aria-hidden="true" />
      <div className="offline-glow" aria-hidden="true" />

      <div className="container offline-inner">
        <motion.div 
          className="offline-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div 
            className="offline-icon-wrapper"
            animate={{ 
              boxShadow: ["0 0 0px rgba(239, 68, 68, 0.1)", "0 0 40px rgba(239, 68, 68, 0.3)", "0 0 0px rgba(239, 68, 68, 0.1)"] 
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <WifiOff size={48} strokeWidth={1.5} className="offline-icon" />
          </motion.div>
          
          <h1 className="offline-title">Connection Severed</h1>
          <p className="offline-desc">
            You have lost your connection to the grid. We cannot fetch the latest PYQs until your internet is restored.
          </p>
          
          <div className="offline-status">
            <RefreshCw size={16} className="offline-spinner" />
            <span>Waiting for network...</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
