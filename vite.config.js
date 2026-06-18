import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base ('./') makes the built site portable: it works at a domain root
// (Vercel/Netlify) AND under a sub-path (GitHub Pages project sites), and even
// when served from a sub-folder. https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
})
