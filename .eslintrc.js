const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': OFF,
    'no-console': WARN,
    'no-unused-vars': ERROR,
    '@typescript-eslint/no-unused-vars': [WARN],
  },
  env: {
    node: true,
    jest: true,
  },
};
