import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173, // Or your preferred frontend port
    proxy: {
      // Proxy API requests to the backend server during development
      "/api": {
        target: "https://render-video-using-express-js-backend.vercel.app/", // Your backend server address
        changeOrigin: true,
        // Optional: rewrite path if needed, but usually not for /api
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
