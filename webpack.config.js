const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const env = process.env.NODE_ENV;
const version = String(require("./package.json").version);

const publicPath = "/" + version + "/";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist/" + version),
    filename: "bundle.[hash].js",
    publicPath,
    //需要上传的目录
    // uploadPath: path.resolve(__dirname + "./dist/")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ["babel-loader?cacheDirectory"],
        exclude: /node_modules/
      },
      {test: /\.(jpg|png|gif|svg|woff|eot|ttf)\??.*$/, loader: "url-loader?limit=100000"},
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      }  
    ]
  },
  resolve: {
    extensions: [".js"],
    modules: ["node_modules", "web_modules"],
    alias: {
      react: path.join(__dirname, "node_modules", "react")
    }
  },
  devServer: {
    historyApiFallback: {
      index: "dist/index.html"
    },
    // contentBase: path.resolve(__dirname, "dist"),
    // 输出文件的路径

    publicPath: publicPath,
    // 和上文 output 的“publicPath”值保持一致
    hot: true,
    proxy: [{
        context: ["/file", "/api"],
        target: "http://hyacinthbaby.com/",
    }]
  },
  plugins: [
    {
      apply: function apply(compiler) {
        compiler.plugin(
          "expression global",
          function expressionGlobalPlugin() {
            this.state.module.addVariable(
              "global",
              "(function() { return this; }()) || Function('return this')()"
            );
            return false;
          }
        );
      }
    },
    new HtmlWebpackPlugin({
      title: "前端框架",
      filename: "../index.html",
      template: path.resolve(__dirname, "./entry/index.ejs"),
      favicon: "./hyacinth.ico"
    }),
    new CleanWebpackPlugin(["dist"], {
      verbose: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    // last css
    new ExtractTextPlugin("./bundle.[hash].css")
  ]
};
