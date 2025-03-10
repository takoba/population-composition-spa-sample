import js from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { config as tseslintConfigFn, configs as tseslintConfigs } from 'typescript-eslint'

export default tseslintConfigFn(
  { ignores: ['dist'] },

  js.configs.recommended,
  tseslintConfigs.recommended,

  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  importPlugin.flatConfigs.errors,

  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      '@stylistic/explicit-module-boundary-types': 'off',
      '@stylistic/max-len': ['error', {
        code: 100,
      }],
      '@stylistic/no-empty-function': 'off',
      '@stylistic/no-empty-interface': 'off',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single'],
      'no-unused-vars': 'off',
      'sort-imports': 'off',
      'import/default': 'off',
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },

  {
    files: ['src/**/*.{ts,mts,tsx}'],

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['', './public']
          ],
        },
      },
    },
  },
)
