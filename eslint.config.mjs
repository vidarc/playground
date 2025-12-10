// @ts-check

import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier/recommended';
import { importX } from 'eslint-plugin-import-x';
import playwright from 'eslint-plugin-playwright';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig(
  globalIgnores(['dist', '.yarn', 'eslint.config.mjs', 'vite.config.js']),
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  // @ts-expect-error this is fine
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['tests/**'],
    extends: [playwright.configs['flat/recommended']],
  },
  prettier,
);
