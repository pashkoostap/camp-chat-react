const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './app.js'
  },
  devtool: 'source-map',
  context: `${__dirname}/src`,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss']
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000
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
    path: `${__dirname}/dist`,
    publicPath: '/assets'
  }
}