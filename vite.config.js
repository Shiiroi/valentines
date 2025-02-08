import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Accessible on your network (all interfaces)
    port: 3000, // Custom port (default is 5173)
    strictPort: true, // Exit if port is already in use
  },
});
