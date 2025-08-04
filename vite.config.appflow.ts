import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Configuración específica para AppFlow - sin conflictos de paths
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: "client", // Root es client
  build: {
    outDir: "../dist/public", // Output relativo a client
    emptyOutDir: true,
    // Sin rollupOptions - Vite automáticamente encuentra index.html en root
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'import.meta.env.DEV': 'false',
    'import.meta.env.PROD': 'true'
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss')({ config: './tailwind.config.mobile.ts' }),
        require('autoprefixer'),
      ],
    },
  }
});