import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'ot27g5',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
