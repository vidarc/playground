import { defineConfig } from 'vite';
import compress from 'vite-plugin-compress';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src',
  plugins: [compress(), react()],
});
