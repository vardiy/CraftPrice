import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const NICHE_SLUGS = ['crochet', 'woodworking', 'jewelry', 'baking', 'sewing']

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes() {
      return ['/', ...NICHE_SLUGS.map((s) => `/calc/${s}`)]
    },
  },
})
