import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { API_ORIGIN, API_KEY } = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: [
        { find: '~', replacement: path.resolve(__dirname, 'src') }
      ],
    },
    server: {
      proxy: {
        '^/api/v1': {
          target: API_ORIGIN,
          changeOrigin: true,
          headers: {
            'Accept': 'application/json',
            'X-API-KEY': API_KEY,
          },
        },
      },
      cors: {
        origin: [API_ORIGIN],
        methods: ['GET'],
        allowedHeaders: ['Accept', 'X-API-KEY'],
      }
    },
    css: {
      modules: {
        localsConvention: 'dashes',
      },
    },
    plugins: [react()],
  }
})
