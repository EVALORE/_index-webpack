# WEBPACK TEMPLATE
> webpack template with ts & js support and linters

> as package manager is used pnpm

## FEATURES
- pnpm
- convert tsconfig paths to webpack alias
  - separate file for aliases/paths
- browserlist
- postcss
- stylelint
  - order
  - sass
- eslint
  - airbnb
  - airbnb/typescript
  - separated rules for ts and js
- prettier
- editorconfig

## [pnpm](https://pnpm.io/)
> if you don't have pnpm installed
> 
`npm install -g pnpm`

## USED PACKAGES:

#### ESLINT
```
pnpm add eslint eslint-config-airbnb eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```
#### STYLELINT
```
pnpm add stylelint stylelint-config-clean-order stylelint-config-standard stylelint-config-standard-scss -D
```
#### BABEL
```
pnpm add babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties -D
```
#### POSTCSS
```
pnpm add postcss postcss-loader postcss-preset-env -D
```
#### WEBPACK
devDependencies
```
pnpm add webpack webpack-cli webpack-dev-server css-loader ts-loader sass sass-loader copy-webpack-plugin -D
```
dependencies
```
pnpm html-webpack-plugin mini-css-extract-plugin webpack-merge
```