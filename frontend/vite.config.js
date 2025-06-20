import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000,
        proxy: {
            '/courses': {target: 'http://backend:5001', changeOrigin: true},
            '^/canvas/user': {
                target: 'http://backend:5001',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/canvas\/user/, '/canvas/user')
            },

            // lista użytkowników
            '^/canvas/users': {
                target: 'http://backend:5001',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/canvas\/users/, '/canvas/users')
            }
        }
    }
})
