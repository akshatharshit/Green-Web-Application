import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://trefle.io/api/v1', // The API base URL
        changeOrigin: true, // This makes sure the target URL receives the correct Origin header
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite URL to remove the '/api' prefix
      },
    },
  },
})
