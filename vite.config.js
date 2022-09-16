import react from '@vitejs/plugin-react';
import compress from 'rollup-plugin-gzip';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
  },
  legacy: {
    buildSsrCjsExternalHeuristics: true,
  },
  plugins: [
    compress(),
    react({
      babel: {
        plugins: ['@compiled/babel-plugin'],
      },
    }),
  ],
});
