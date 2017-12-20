'use strict'

const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const env = process.env.NODE_ENV

module.exports = {
  target: 'web',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: '/',
    filename: 'bundle.js',
  },
  resolve: {
    modulesDirectories: ['node_modules', 'web_modules']
  },
  externals: {
    'pinyin': "pinyin"
  },
  //devtool相关说明，https://segmentfault.com/a/1190000004280859，可自己按照实际情况调整
  devtool: "#eval",
  module: {
    loaders: [
      {test: /\.js|jsx$/, loaders: ['babel-loader?cacheDirectory'], exclude: /node_modules/},
      {test: /\.css$/, loader: "style!css"},
      {test: /\.less/, loader: "style!css!less"},
      {test: /\.(jpg|png|gif|svg|woff|eot|ttf)\??.*$/, loader: "url?limit=100000"}
    ]
  },
  plugins:
    [
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
    ]
};
