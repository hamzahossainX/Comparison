import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * PAGES_BASE_PATH contract (shared by all three builds in this repository):
 *
 *   Set PAGES_BASE_PATH ONLY in the GitHub Pages deployment workflow, to the subpath this build
 *   is served from — e.g. "/Comparison/codex/". Vite rewrites every emitted asset URL to sit
 *   under it. Left unset, the build is served from the root path exactly as before.
 *
 *   Vite requires the base to end in a slash; the workflow passes it that way.
 */
const base = process.env.PAGES_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react'
          if (/node_modules\/(three|@react-three|three-stdlib)\//.test(id)) return 'three'
          if (/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion'
        },
      },
    },
  },
})
