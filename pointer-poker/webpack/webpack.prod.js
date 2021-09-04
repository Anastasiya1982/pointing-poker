const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const EslintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Covevolution'),
    }),
    new BundleAnalyzerPlugin(),
    new EslintWebpackPlugin({
      extensions: ['ts', 'tsx', 'js', 'jsx'],
      failOnError : true,
    }),
  ],
};
