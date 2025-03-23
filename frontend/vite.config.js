import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Ensures proper asset paths
  build: {
    outDir: "dist", // Ensure Vercel uses the correct build folder
  },
});
