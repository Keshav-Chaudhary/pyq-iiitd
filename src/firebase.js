// Firebase configuration
// Replace these values with your actual Firebase project config
// from https://console.firebase.google.com/

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Analytics (optional — only works in production with a real config)
let analytics = null
try {
  analytics = getAnalytics(app)
} catch (e) {
  // Analytics may not be available in dev/localhost
}

export { app, analytics }
