const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
const resolveTsconfigPathsToAlias = require('./alias-convert');
const paths = require('./paths');

module.exports = {
  context: paths.src,
  entry: `${paths.src}/index`,
  output: {
    path: paths.build,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: `${paths.src}/index.html` }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: { ignore: ['*.DS_Store'] },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  module: {
    rules: [
      { test: /\.js$/i, use: ['babel-loader'] },
      { test: /\.ts$/i, loader: 'ts-loader' },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i, type: 'asset/inline' },
      { test: /\.scss$/i, use: [loader, 'css-loader', 'sass-loader'] },
      { test: /\.css$/i, use: [loader, 'css-loader'] },
    ],
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.ts', '.json'],
    alias: resolveTsconfigPathsToAlias({
      tsconfigPath: '../tsconfig.paths.json',
    }),
  },
};
