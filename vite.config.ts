import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 3000,
  // },
  resolve: {
    alias: {
      "@containers": path.resolve(__dirname, "./containers"),
      "@services": path.resolve(__dirname, "./services/index.tsx"),
      "@types": path.resolve(__dirname, "./src/types/index.ts"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
