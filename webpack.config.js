const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss']
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.json?$/, use: ['json-loader'], exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist/`,
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin([
      { from: './src/assets', to: './assets', force: true }
    ])
  ]
}