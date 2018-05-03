const webpack = require('webpack');
const path    = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

const config = {
  target: 'electron-main',

  devtool: 'source-map',

  context: path.resolve(__dirname, 'src'),

  entry: {
    'main': './main/main.ts',
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  performance: { hints: false },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: { '@': __dirname + '/src/renderer' },
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:   JSON.stringify(process.env.NODE_ENV),
        DEV_SERVER: JSON.stringify(process.env.DEV_SERVER),
      },
    }),

    new WebpackNotifierPlugin({
      title: 'Lagune Main',
      contentImage: path.resolve("./resources/lagune.png"),
      alwaysNotify: true,
    }),
  ],
};

module.exports = config;
