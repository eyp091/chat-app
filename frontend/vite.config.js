import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:3000,
    proxy: {
      "/api": { // farklı sunucuda çalışan backend serivisine talepleri yönlendirir.
        target: "http://localhost:5000" // api ile başlayan tüm istekleri proxy ayarı ile bu adrese yönlendirir
      }
    }
  }
})
