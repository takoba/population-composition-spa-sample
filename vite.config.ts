import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '~', replacement: path.resolve(__dirname, 'src') }
    ],
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
  plugins: [react()],
})
