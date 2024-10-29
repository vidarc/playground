import path from 'node:path';

import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
// eslint-disable-next-line import/no-unresolved
import typescriptEslint from '@typescript-eslint/eslint-plugin';
// eslint-disable-next-line import/no-unresolved
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules', '**/dist', '.yarn/releases/**'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:prettier/recommended',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      prettier: fixupPluginRules(prettier),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.eslint.json', './cypress/tsconfig.json'],
      },
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',

      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },

          'newlines-between': 'always-and-inside-groups',
        },
      ],
    },
  },
];
