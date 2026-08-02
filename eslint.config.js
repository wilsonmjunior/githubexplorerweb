import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import-x'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
      },
    },
  },
  {
    files: ['src/core/domain/**/*.{ts,tsx}'],
    plugins: {
      'import-x': importPlugin,
    },
    rules: {
      'import-x/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/core/domain',
              from: './src/core/application',
              message:
                'Domain cannot depend on application; define types in domain and re-export from application if needed.',
            },
            {
              target: './src/core/domain',
              from: './src/core/infra',
              message: 'Domain cannot depend on infrastructure.',
            },
            {
              target: './src/core/domain',
              from: './src/core/presentation',
              message: 'Domain cannot depend on presentation.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/core/application/**/*.{ts,tsx}'],
    plugins: {
      'import-x': importPlugin,
    },
    rules: {
      'import-x/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/core/application',
              from: './src/core/infra',
              message:
                'Application cannot depend on infrastructure; use composition/infra adapters.',
            },
            {
              target: './src/core/application',
              from: './src/core/presentation',
              message: 'Application cannot depend on presentation.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/core/presentation/**/*.{ts,tsx}'],
    plugins: {
      'import-x': importPlugin,
    },
    rules: {
      'import-x/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/core/presentation',
              from: './src/core/infra',
              message:
                'Presentation cannot depend on infrastructure; use domain/application ports and composition (make*).',
            },
          ],
        },
      ],
    },
  },
])
