const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: "development",
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader", // 바벨 로더를 추가한다
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: () => {
        const commit = childProcess.execSync("git rev-parse --short HEAD")
        const user = childProcess.execSync("git config user.name")
        const date = new Date().toLocaleString()
        return `commitVersion: ${commit}` + `Build Date: ${date}\n` + `Author: ${user}`
      }
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v.1.2.3"),
      PRODUCTION: JSON.stringify(false)
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true
      } : false,
      hash: true
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
}