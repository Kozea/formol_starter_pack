import path from 'path'

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const filename =
  process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].js'

export default {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename,
    chunkFilename: filename,
    publicPath: '/',
    path: path.resolve(__dirname, 'assets'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(formol)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  targets: { browsers: 'last 1 version and > 3%' },
                  modules: false,
                },
              ],
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              'add-react-static-displayname',
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'formol-starter-pack',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css',
    }),
  ],
  devServer: {
    port: 7777,
    historyApiFallback: {
      index: '/index.html',
    },
    hot: true,
    overlay: true,
    disableHostCheck: true,
    compress: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
}
