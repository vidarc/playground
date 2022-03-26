import react from '@vitejs/plugin-react';
import compress from 'rollup-plugin-gzip';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
  },
  plugins: [
    compress(),
    react({
      jsxRuntime: 'classic',
      babel: {
        plugins: ['@compiled/babel-plugin'],
      },
    }),
  ],
});
