import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "public" }],
    }),
  ],
  devtool: "source-map",
  mode: "development",
  devServer: {
    static: [
      path.resolve(__dirname, "dist"),
      path.resolve(__dirname, "public"),
    ],
    open: true,
    hot: true,
  },
};
