import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        proxy: {
            "/auth": {
                target: "https://synergysolver-backend.vercel.app",
                changeOrigin: true,
                secure: false,
                configure: (proxy) => {
                    proxy.on("proxyReq", (proxyReq) => {
                        proxyReq.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
                        proxyReq.setHeader("Pragma", "no-cache");
                        proxyReq.setHeader("Expires", "0");
                    });
                },
            },
            "/api": {
                target: "https://synergysolver-backend.vercel.app",
                changeOrigin: true,
                secure: false,
                configure: (proxy) => {
                    proxy.on("proxyReq", (proxyReq) => {
                        proxyReq.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
                        proxyReq.setHeader("Pragma", "no-cache");
                        proxyReq.setHeader("Expires", "0");
                    });
                },
            },
        },
    },
});
