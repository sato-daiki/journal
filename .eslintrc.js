module.exports = {
  // fetchを有効化する
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  // decorator等、Babel独自の記法を許可する
  // __DEV__をGlobal関数とみなす
  globals: {
    __DEV__: true,
    window: true,
  },
  rules: {
    'react/jsx-filename-extension': ['off'],
    'react/prop-types': ['off'],
    'react/forbid-prop-types': ['off'],
    'react/require-default-props': ['off'],
    'react/sort-comp': ['off'],
    'class-methods-use-this': ['off'],
    'no-use-before-define': ['off'],
    'max-len': ['off'],
    'no-shadow': ['off'],
    'no-nested-ternary': ['off'],
    'no-plusplus': ['off'],
    'no-multi-assign': ['off'],
    'no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
