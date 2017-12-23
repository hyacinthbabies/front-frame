const webpack = require("webpack");
const pkg = require("./package.json");
const path = require("path");
const fileName = "[name].js";
const outputPath = "./public";

// 资源依赖包，提前编译
const lib = [
  "react",
  "react-dom",
  "react-router",
  "react-router-dom"
];

const plugin = [
  new webpack.DllPlugin({
    name: "[name]",
    context: __dirname,
    path: path.resolve(outputPath, "manifest.json")
  })
];

module.exports = {
  devtool: "#source-map",
  entry: {
    lib: lib
  },
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: fileName,
    library: "[name]",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: plugin
};
