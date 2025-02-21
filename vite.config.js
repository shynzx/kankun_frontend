import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Asegúrate de que sea la URL de tu backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
