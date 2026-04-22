import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        guide: 'guide.html',
        giftQa: 'gift-qa.html',
      },
    },
  },
})
