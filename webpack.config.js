/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  mode: 'development',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js', // app.bundle.js
    library: 'main',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
