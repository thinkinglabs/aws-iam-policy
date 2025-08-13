import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import {defineConfig, globalIgnores} from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin'
import ts from 'typescript';

export default tseslint.config([
  { 
    files: ['src/**/*.ts', 'tests/**/*.spec.ts'],
    plugins: {
      eslint,
      tseslint,
      '@stylistic': stylistic,
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
    ],
    languageOptions: { globals: globals.browser },
    rules: {
      'max-len': ['error', {
        'code': 120,
      }],
      '@typescript-eslint/no-unused-expressions': 0,
      '@stylistic/quotes': ['error', 'single'],
    },
  },
], globalIgnores(['dist/']));

