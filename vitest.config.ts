import path from 'path'; // Import path module
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Optional: enable global APIs like describe, it, expect
    environment: 'jsdom', // Optional: setup jsdom environment for browser APIs
    include: ['tests/**/*.test.{ts,tsx}'], // Include .tsx files as well

    // You might need setup files for mocking globals or other test setup
    // setupFiles: './tests/setup.ts',
  },
  resolve: {
    // Explicitly define the alias for Vitest
    alias: [
      { find: '~', replacement: path.resolve(__dirname, 'src') },
      // Add other aliases from vite.config.ts if needed
    ],
  },

  optimizeDeps: {
    esbuildOptions: {
      tsconfig: './tests/tsconfig.json',
    }
  },
});
