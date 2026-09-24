import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let lastUpdated = null
try {
  const syncReportPath = path.resolve(__dirname, 'src/data/syncReport.json')
  if (fs.existsSync(syncReportPath)) {
    const report = JSON.parse(fs.readFileSync(syncReportPath, 'utf8'))
    if (report && report.timestamp) {
      lastUpdated = report.timestamp
    }
  }
} catch {
  // fallback
}

if (!lastUpdated) {
  lastUpdated = new Date().toISOString()
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_LAST_UPDATED__: JSON.stringify(lastUpdated)
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'IIITD PYQs By Kc',
        short_name: 'PYQs Hub',
        description: 'Browse and download past year exam papers for IIIT Delhi.',
        theme_color: '#011220',
        background_color: '#011220',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'github-content-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  // Base path — set to '/' for Firebase Hosting (custom domain or project URL)
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
