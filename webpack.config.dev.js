'use strict'

const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const env = process.env.NODE_ENV

const config = {
  target: 'web',
  entry: './src/index.tsx',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      { test: /\.js$/, loaders: ['react-hot', 'babel-loader?cacheDirectory'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less'},
      { test: /\.(jpg|png)$/, loader: "url?limit=100000'"},
      {
        enforce: 'pre',
        test: '/\.js$/',
        loader: 'source-map-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx','.ts','.tsx'],
    modulesDirectories: ['node_modules', 'web_modules','publicFile']
  },
  output: {
    path: 'build/',
    filename: 'bundle.js',
    publicFile:'build/'
  },
  //devtool相关说明，https://segmentfault.com/a/1190000004280859，可自己按照实际情况调整
  devtool: "#eval",
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./public/manifest.json'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    // 自动打开浏览器
    new OpenBrowserPlugin({
        browser: 'Google Chrome'
    })
  ],
}

module.exports = config;
