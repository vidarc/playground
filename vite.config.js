import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
  },
  plugins: [
    react({
      babel: {
        plugins: ['@compiled/babel-plugin'],
      },
    }),
  ],
});
