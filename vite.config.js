import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import compress from 'vite-plugin-compress';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  plugins: [compress(), react()],
});
