import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        manifest: 'manifest.json',
        rollupOptions: {
            // input: {
            //   main: 'src/main.js',
            // },
        },
    },
    server: {
        origin: 'https://control.remontti.site:443',
    }
})