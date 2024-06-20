import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@master': fileURLToPath(
        new URL('./src/modules/master', import.meta.url)
      ),
      '@system': fileURLToPath(
        new URL('./src/modules/system', import.meta.url)
      ),
      '@payment': fileURLToPath(
        new URL('./src/modules/payment', import.meta.url)
      ),
      '@auth': fileURLToPath(new URL('./src/modules/auth', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/modules/app', import.meta.url)),
    },
  },
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  }
})
