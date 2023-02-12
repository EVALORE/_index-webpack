module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base/legacy', 'prettier'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
    quotes: ['error', 'single'],
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['public/**/*.js'],
};
