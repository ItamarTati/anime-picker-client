import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'client/dist',
  },
  server: {
    proxy: {
      '/api/shows': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
});

