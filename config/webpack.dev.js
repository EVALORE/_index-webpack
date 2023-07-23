const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const { build } = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    static: { directory: build },
    host: 'local-ip',
  },
  output: {
    filename: '[name].js',
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],
});
