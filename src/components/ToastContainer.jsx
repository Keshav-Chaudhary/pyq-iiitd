import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react'
import { useToast } from '../context/ToastContext'
import '../styles/Toast.css'

const TOAST_ICONS = {
  success: <CheckCircle size={18} strokeWidth={2.5} className="toast-icon toast-icon-success" />,
  error: <XCircle size={18} strokeWidth={2.5} className="toast-icon toast-icon-error" />,
  warning: <AlertTriangle size={18} strokeWidth={2.5} className="toast-icon toast-icon-warning" />,
  default: <Info size={18} strokeWidth={2.5} className="toast-icon toast-icon-default" />
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="toast-container" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`toast-card toast-${toast.type}`}
            onClick={() => removeToast(toast.id)}
            role="alert"
          >
            {TOAST_ICONS[toast.type] || TOAST_ICONS.default}
            <span className="toast-message">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
