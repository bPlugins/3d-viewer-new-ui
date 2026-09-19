import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served as a GitHub Pages *project* page — https://bplugins.github.io/3d-viewer-new-ui/ —
// so every asset URL needs the repo name as a base path, not just "/".
// Output goes straight to docs/ so Pages can serve "main /docs" with no build step.
export default defineConfig({
  base: '/3d-viewer-new-ui/',
  plugins: [react()],
  server: { port: 5173 },
  build: {
    outDir: 'docs',
  },
})
