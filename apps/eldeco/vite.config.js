import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Eldeco is served as a sub-app of aiproducts.analytx4t.com at /app/eldeco/.
// `base` drives asset URLs, the router basename (App.jsx) and API paths (src/lib/apiPath.js).
const BASE = '/app/eldeco/'

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    // Mirrors the nginx rule: /app/eldeco/api/* -> backend :8000/api/*
    proxy: {
      [`${BASE}api`]: {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (p) => p.replace(BASE.slice(0, -1), ''),
      },
    },
  },
})
