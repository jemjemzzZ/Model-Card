import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/Model-Card/",
  plugins: [
    react(),
    viteTsconfigPaths(),
    checker({
      typescript: {
        buildMode: true,
      },
    }),
  ],
  server: {
    open: false,
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    preserveSymlinks: false,
  },
});
