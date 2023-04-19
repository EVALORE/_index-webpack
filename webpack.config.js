const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, node) => {
  // set mode in dependency of env mode
  const isProd = node.nodeEnv === "production";

  // specify file format
  const filename = (ext) =>
    isProd ? `[name].[contenthash].${ext}` : `[name].${ext}`;

  // max size for inline asset
  const sizeLimit = {
    images: 8192,
    fonts: 8192
  }

  const paths = {
    source: path.resolve(__dirname, "src"),
    output: path.resolve(__dirname, "dist")
  }

  return {
    // set mode in witch will run webpack
    mode: isProd ? "production" : "development",
    // set source map for dev
    devtool: isProd ? false : "inline-source-map",
    // specify the environment target
    target: isProd ? "browserslist" : "web",

    // webpack-dev-server configuration
    devServer: {
      // open default browser on run
      open: true,
      // serve static files from path
      static: { directory: path.join(__dirname, "dist") },
      // allow to open serve on any device
      host: "local-ip",
    },

    // root path for files
    context: paths.source,

    // entry points for every page
    entry: {
      main: path.resolve(paths.source, "main", "index.js"),
      pets: path.resolve(paths.source, "pets", "index.js"),
    },

    // output settings
    output: {
      // clean dist on start if is prod
      clean: isProd,
      // create async chunks that are loaded on demand
      asyncChunks: true,
      // output bundle filename
      filename: filename("js"),
      // general file path & format
      assetModuleFilename: "[file]",
      // specify where to place your build
      path: path.resolve(__dirname, "dist"),
      // literally specify how to start every path
      publicPath: isProd ? "./" : "auto",
    },

    // performance threshold configuration values
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },

    plugins: [
      new HtmlWebpackPlugin({
        // set page title
        title: "main",
        // specify witch entry points to use
        chunks: ["main"],
        // output filename
        filename: "index.html",
        template: path.resolve(paths.source, "main", "index.html"),
      }),
      new HtmlWebpackPlugin({
        // set page title
        title: "pets",
        // specify witch entry points to use
        chunks: ["pets"],
        // output filename
        filename: "pets.html",
        template: path.resolve(paths.source, "pets", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: filename("css"),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src", "assets", "favicon.ico"),
            to: path.resolve(__dirname, "dist", "assets", "favicon.ico"),
          },
          {
            from: path.resolve(__dirname, "src", "assets", "json", "pets.json"),
            to: path.resolve(__dirname, "dist", "assets", "json", "pets.json"),
          },
        ],
      }),
      new TerserPlugin({
        terserOptions: {
          // compress output js files on prod
          compress: isProd,
        },
      }),
    ],

    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, "src"),
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)$/i,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: sizeLimit.images,
            },
          },
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/i,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: sizeLimit.fonts,
            },
          },
        },
        {
          test: /\.(s(a|c)ss|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
            "postcss-loader",
            {
              loader: "resolve-url-loader",
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  };
};
