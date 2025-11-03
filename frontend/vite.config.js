import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://backend-privilege-escalation-web.onrender.com/',
      '/admin': 'https://backend-privilege-escalation-web.onrender.com/'
    }
  }
})

