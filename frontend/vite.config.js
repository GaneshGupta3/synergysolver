import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        proxy: {
            "/auth": "http://localhost:5000", // Proxying to the Express server
            "/api": "http://localhost:5000", // Proxying to the Express server
        },
    },
});