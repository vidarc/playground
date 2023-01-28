import linaria from '@linaria/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
  },
  plugins: [react(), linaria()],
});
