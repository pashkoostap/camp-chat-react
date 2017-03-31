const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  devtool: 'source-map',
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less']
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
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist`,
    publicPath: '/assets'
  }
}