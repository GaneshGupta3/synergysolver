import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        proxy: {
            // "/auth": "https://synergysolver-backend.vercel.app/", // Proxying to the Express server https://synergysolver-backend.vercel.app
            // "/api": "https://synergysolver-backend.vercel.app/", // Proxying to the Express server
            "/auth": "http://localhost:5000",
            "/api": "http://localhost:5000", 
        },
    },
});