const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  target: 'web',
  devtool: false,
  output: {
    clean: true,
    filename: '[contenthash].js',
    publicPath: './',
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[contenthash].css' })],
});
