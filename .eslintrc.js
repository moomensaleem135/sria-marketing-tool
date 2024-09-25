module.exports = {
  root: true,
  // endOfLine: 'auto',
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'prettier'
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'eslint-plugin-import-helpers',
    'testing-library'
  ],
  overrides: [
    // Only uses Testing Library lint rules in test files
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react']
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true
  },
  rules: {
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'newline-before-return': 2,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-unknown-property': 1,
    'import-helpers/order-imports': [
      1,
      {
        newlinesBetween: 'always',
        groups: [
          ['/^next/', 'module'],
          '/^@/styles/',
          '/^@/components/',
          '/^@/lib/',
          ['parent', 'sibling', 'index']
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        }
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        argsIgnorePattern: '^_'
      }
    ],
    'no-console': [
      1,
      {
        allow: ['warn', 'error']
      }
    ],
    // Update the '@typescript-eslint/no-explicit-any' rule to warn instead of error
    '@typescript-eslint/no-explicit-any': [
      0, // 1 is a warning, 2 is an error
      {
        ignoreRestArgs: true
      }
    ],
    'react/no-children-prop': 1
  }
};
