import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import copy from 'rollup-plugin-copy'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ registerType: 'autoUpdate' }),
    copy({
      targets: [
        { src: 'src/assets/icons/*', dest: 'dist/assets/icons' }
      ],
      hook: 'writeBundle'
    })
    
  ],
  build: {
    outDir: 'dist',
  }
});