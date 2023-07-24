module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:import/recommended'],
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        'airbnb-typescript/base',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
      ],
      plugins: ['@typescript-eslint', 'import'],
      parser: '@typescript-eslint/parser',
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['public', 'node_modules', 'dist', '.eslintrc.js'],
};
