import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { RefreshCw, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/PwaUpdatePrompt.css'

export default function PwaUpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // SW is registered
    },
    onRegisterError(error) {
      console.error('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <AnimatePresence>
      {(offlineReady || needRefresh) && (
        <motion.div
          className="pwa-prompt-container"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          role="alert"
        >
          <div className="pwa-prompt-content">
            <div className="pwa-prompt-icon">
              <RefreshCw size={20} strokeWidth={2.5} className={needRefresh ? 'spin-anim' : ''} />
            </div>
            <div className="pwa-prompt-text">
              {offlineReady ? (
                <>
                  <strong>App ready for offline use.</strong>
                  <br />
                  <span>You can now use PYQs without an internet connection.</span>
                </>
              ) : (
                <>
                  <strong>New version available!</strong>
                  <br />
                  <span>Click update to apply the latest features and fixes.</span>
                </>
              )}
            </div>
          </div>
          <div className="pwa-prompt-actions">
            {needRefresh && (
              <button className="pwa-btn-primary" onClick={() => updateServiceWorker(true)}>
                Update
              </button>
            )}
            <button className="pwa-btn-close" onClick={close} aria-label="Close">
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
