const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const env = process.env.NODE_ENV;

module.exports = {
  target: "web",
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    publicPath: "/",
    path: __dirname + "/dist",
    filename: '[name].js',
		chunkFilename: '[name]-[id].[chunkhash:8].bundle.js'
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js"],
    modules: ["node_modules", "web_modules"],
    alias: {
      react: path.join(__dirname, "node_modules", "react")
    }
  },
  module: {
    rules: [
      {
				test: /\.js?$/,
        use: {
					loader: 'babel-loader',
				},
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "src")]
			},
      {
        enforce: "pre",
        test: "/.js$/",
        loader: "source-map-loader"
      },
      {test: /\.(jpg|png|gif|svg|woff|eot|ttf)\??.*$/, loader: "url-loader?limit=100000"},
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //           {
      //             loader: "style-loader"
      //           }, {
      //              loader: "css-loader",
      //              options: {
      //                  modules: true, // 指定启用css modules
      //                  localIdentName: '[name]_[local]_[hash:base64:5]' // 指定css的类名格式
      //                  }
      //              }
      //        ],
      // },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      }  
    ]
  },
  devServer: {
    historyApiFallback: {
      index: "dist/index.html"
    },
    port: 8080,
    host: "localhost",
    // contentBase: path.resolve(__dirname, "dist"),
    // 输出文件的路径

    publicPath: "/",
    // 和上文 output 的“publicPath”值保持一致
    hot: true,
    proxy: [{
        context: ["/file", "/api"],
        target: "http://hyacinthbaby.com",
        // target: "http://127.0.0.1:3000"
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, "./public/manifest.json")
    // }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    //提取css
		// new ExtractTextPlugin("[name].css"),
    // 拆分依赖包JS到自己的文件
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function(module, count) {
				// node_modules内的任何必需模块都将提取给依赖包
				return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0)
			}
		}),
    new HtmlWebpackPlugin({
      title: "个人小站",
      template: path.resolve(__dirname, "./entry/index.ejs"),
      favicon: "./hyacinth.ico"
    })
  ]
};
