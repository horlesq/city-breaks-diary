import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // ensure modern JS support
    outDir: 'dist',  // ensure Vite outputs to the correct folder
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript', // serve JavaScript with the correct MIME type
    },
  },
})
