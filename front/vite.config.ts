import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const host = (mode == "development") ? "localhost" : "backend";
    const url = `http://${host}:3333`;
    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api": url
            }
        }
    }
})
