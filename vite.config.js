import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        test2: 'test2.html',
        test3: 'test3.html',
      },
    },
  },
})
