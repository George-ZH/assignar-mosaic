const path = require('path');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/build`,
    filename: `[name].js`
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {test: /\.css$/, loader: [ 'style-loader', 'css-loader' ]},
      { test: /\.(jpg|png)$/, loader: 'file-loader?name=images/[name].[ext]' }
    ]
  },
  plugins: [
		new CommonsChunkPlugin({name: "commons"})
	]
}
