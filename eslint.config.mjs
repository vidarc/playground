// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import tsParser from '@typescript-eslint/parser';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  // eslintPluginImportX.flatConfigs.recommended,
  // eslintPluginImportX.flatConfigs.typescript,
  eslintConfigPrettier,
  {
    ignores: ['dist', '.yarn'],
  },
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['cypress/**'],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    extends: [pluginCypress.configs.recommended],
  },
);
