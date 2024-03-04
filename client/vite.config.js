import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            assets: "/src/assets",
            button: "/src/components/button",
            css: "/src/assets/css",
            components: "/src/components",
            contexts: "/src/contexts",
            features: "/src/features",
            pages: "/src/pages",
            routes: "/src/routes",
            src: "/src"
        }
    }
})
