import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        //프록시 할 경로
        target: "http://192.168.28.224:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,""),
      }
    }
  }
})
