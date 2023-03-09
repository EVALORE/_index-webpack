const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const StylelintWebpackPlugin = require("stylelint-webpack-plugin");

const production = process.env.NODE_ENV === "production";

let mode = "development";
let target = "web";
let devtool = "source-map";

if (production) {
  mode = "production";
  target = "browserslist";
  devtool = false;
}

const filename = (ext) =>
  production ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

module.exports = {
  // режим сборки
  mode,

  target,

  // определяет стиль карт ресурсов (source maps)
  devtool,

  // определяет настройки для webpack-dev-server
  devServer: {
    // "горячая" замена модулей
    hot: true,
    // открыть браузер после начала обслуживания файлов
    open: true,
    // порт
    port: 3000,
    liveReload: false,
    client: {
      // отключение логов состояния
      logging: "none",
      // отключение оверлея
      overlay: false,
    },
    // хост
    host: "local-ip",
  },

  // определяет контекст сборки - основную директорию
  context: path.resolve(__dirname, "source"),

  // входная точка
  entry: path.resolve(__dirname, "source", "index.js"),

  // определяет директорию, в которую помещаются файлы сборки.
  output: {
    // путь к директории
    path: path.resolve(__dirname, "public"),
    // очистка директории
    clean: true,
    // названия файлов
    filename: filename("js"),
    assetModuleFilename: "[file]",
  },

  // настройка плагинов
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "source", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "source", "assets", "json"),
          to: path.resolve(__dirname, "public/assets/json"),
        },
        {
          from: path.resolve(__dirname, "source", "assets", "sounds"),
          to: path.resolve(__dirname, "public", "assets", "sounds"),
        },
      ],
    }),
    new ESLintWebpackPlugin(),
    new StylelintWebpackPlugin(),
  ],

  //
  resolve: {
    // расширения по умолчанию
    extensions: [".js", ".json", ".scss"],
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: production,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new HtmlMinimizerPlugin(),
    ],
  },

  // обработка файлов
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        // поиск файлов
        test: /\.(c|sa|sc)ss$/i,
        // порядок работы снизу-вверх
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|webp|gif|svg)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
        // способ загрузки
        type: "asset/resource",
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(js)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.json$/i,
        type: "json",
      },
      {
        test: /\.(mp3)$/i,
        type: "asset/resource",
      },
    ],
  },
};
