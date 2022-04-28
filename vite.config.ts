import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        'yet-another-nothing': mode === 'development' ? './client/src/exp' : './client/src/exp.ts'
      }
    },
    root: 'client',
    build: {
      outDir: '../build'
    }
  }
})
