import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 5173, // Ensure this matches the frontend's development port
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Backend REST API
        changeOrigin: true, // Rewrite the Host header to match the target
        rewrite: (path) => path.replace(/^\/api/, ""), // Map /api/* to the backend's base URL
      },
      "/ws": {
        target: "ws://localhost:8000", // WebSocket endpoint
        ws: true, // Enable WebSocket proxying
        changeOrigin: true,
      },
    },
  },
});
