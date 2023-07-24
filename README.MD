# WEBPACK TEMPLATE

> webpack template with ts & js support and linters

> as package manager is used pnpm

## FEATURES

- pnpm
- commitizen
- husky
  - branch check
  - no console.log check
- lint-staged
- convert tsconfig paths to webpack alias
  - separate file for aliases/paths
- browserlist
- postcss
- stylelint
  - order
  - scss
- eslint
  - airbnb
  - airbnb/typescript
  - separated rules for ts and js
- prettier
- editorconfig

## [pnpm](https://pnpm.io/)

> if you don't have pnpm installed

```
npm install -g pnpm
```

## USED PACKAGES:

#### HUSKY

```
pnpm dlx husky-init && pnpm install
```

#### LINT-STAGED

```
pnpm add lint-staged -D
```

#### COMMITIZEN

```
pnpm install commitizen -g
commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```

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
pnpm html-webpack-plugin mini-css-extract-plugin webpack-merge copy-webpack-plugin
```