import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ARTICLES } from './src/content/articles/index.js'

const NICHE_SLUGS = ['crochet', 'woodworking', 'jewelry', 'baking', 'sewing']

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes() {
      return [
        '/',
        '/learn',
        ...NICHE_SLUGS.map((s) => `/calc/${s}`),
        ...ARTICLES.map((a) => `/learn/${a.slug}`),
      ]
    },
  },
})
