import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://52.213.176.89', // Backend server
        changeOrigin: true, // Ensure the request appears to come from the frontend server
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove '/api' prefix
      },
    },
  },
  main: {},
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
