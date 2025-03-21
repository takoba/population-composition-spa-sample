import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '~', replacement: 'src' }
    ],
  },
  plugins: [react()],
})
