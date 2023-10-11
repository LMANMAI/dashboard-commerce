import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";
import customTheme from "./customTheme";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@containers": path.resolve(__dirname, "./containers"),
      "@services": path.resolve(__dirname, "./services/index.tsx"),
      "@types": path.resolve(__dirname, "./src/types/index.ts"),
      "@customTheme": "./customTheme.ts",
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: customTheme, // Usa el tema personalizado aquí
        javascriptEnabled: true,
      },
    },
  },
});
