import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "./",  // Change to "/" if using root domain
  build: {
    outDir: "dist",  // Ensure it builds inside dist/
    emptyOutDir: true
  }
});
