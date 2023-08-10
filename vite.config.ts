import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@containers" : path.resolve(__dirname, './containers'),
      "@services" : path.resolve(__dirname, './services/index.tsx')
    },
  },
})


//mongodb+srv://<lucasmanmai>:<c86VNzigxVaU4dBw>@cluster0.fnusd.mongodb.net/