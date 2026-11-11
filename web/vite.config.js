import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // long-lived vendor chunks so a content change doesn't bust them
        manualChunks: { react: ['react', 'react-dom', 'react-router'], motion: ['motion', 'lenis'] },
      },
    },
  },
  server: {
    port: 5173,
    // In dev, product sub-apps run on their own Vite servers; proxy them so the
    // portal iframe uses the same /app/<slug>/ URLs as production (nginx).
    proxy: {
      '/app/eldeco': { target: 'http://localhost:5174', changeOrigin: true, ws: true },
      '/app/bank-reconciliation': { target: 'http://localhost:5176', changeOrigin: true, ws: true },
      '/app/virtual-cfo': { target: 'http://localhost:5175', changeOrigin: true, ws: true },
      '/app/invoice-automation': { target: 'http://localhost:5177', changeOrigin: true, ws: true },
    },
  },
})
