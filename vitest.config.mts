import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: "__tests__/setup/setupTests.ts",
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./") }]
  },
});
