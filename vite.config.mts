import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

import { dependencies } from "./package.json";

const VENDORS = ["react", "react-dom"];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' },
    }),
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          for (const vendor of VENDORS) {
            if (id.includes(`/node_modules/${vendor}/`)) return "vendor";
          }
          for (const dep of Object.keys(dependencies)) {
            if (VENDORS.includes(dep)) continue;
            if (id.includes(`/node_modules/${dep}/`)) return dep;
          }
        },
      },
    },
  },
});

