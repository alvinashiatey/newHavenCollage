const path = require("path");
const htmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "index.js",
  },
  devServer: {
    contentBase: "./dist/",
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new htmlWebPackPlugin({
      filename: "./index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new CopyPlugin([
      {
        from: "./src/assets/",
        to: "./assets/",
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: "head", // insert style tag inside of <head>
              injectType: "singletonStyleTag", // this is for wrap all your style in just one style tag
            },
          },
          "css-loader",
          "resolve-url-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        test: /\.(png|jpe?g|gif|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets",
            },
          },
        ],
      },
      {
        type: "javascript/auto",
        test: /\.(json)/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]" },
          },
        ],
      },
    ],
  },
  devtool: "cheap-module-source-map",
};
