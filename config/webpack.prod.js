const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    clean: true,
    filename: '[contenthash].js',
    publicPath: './',
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[contenthash].css' }),
    new ESLintWebpackPlugin({
      extensions: ['js', 'ts'],
      fix: true,
      lintDirtyModulesOnly: true,
    }),
    new StylelintWebpackPlugin({ fix: true, lintDirtyModulesOnly: true }),
  ],
});
