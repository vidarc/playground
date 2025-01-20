// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    ignores: ['dist', '.yarn', 'eslint.config.mjs', 'vite.config.js'],
  },
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
    files: ['cypress/**'],
    extends: [pluginCypress.configs.globals, pluginCypress.configs.recommended],
  },
);
