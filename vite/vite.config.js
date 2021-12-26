import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve('src'),
        }
    },
    plugins: [vue()],
    server: {
        proxy: {
            '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: path => {
                    path = path.replace(/^\/api/,'')
                    return path
                }
            }
        }
    }
})

