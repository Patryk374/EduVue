import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/courses': {
        target: 'http://backend:5000',
        changeOrigin: true
      }
    }
  }
})
