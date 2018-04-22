const webpack = require('webpack');
const path    = require('path');
const HtmlWebpackPlugin        = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin    = require('webpack-notifier');

require('dotenv').config();

const config = {
  target: 'electron-renderer',

  devtool: 'source-map',

  context: path.resolve(__dirname, 'src'),

  entry: {
    'renderer': './renderer/main.tsx',
    'style': './styles/main.scss',
    'fontawesome': [
      '@fortawesome/fontawesome',
      '@fortawesome/fontawesome-free-brands',
      '@fortawesome/fontawesome-free-regular',
      '@fortawesome/fontawesome-free-solid',
    ]
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|ttf|otf|eot|svg|woff(2)?)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: path.resolve(__dirname, 'dist'),
          },
        }],
      },
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  performance: { hints: false },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: { '@': __dirname + '/src/renderer' },
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:   JSON.stringify(process.env.NODE_ENV),
        SERVER_URL: JSON.stringify(process.env.SERVER_URL),
      },
    }),

    new HtmlWebpackPlugin({
      title: 'Lagune',
      filename: 'index.html',
      template: path.resolve('./src/index.html'),
    }),

    new ExtractTextWebpackPlugin({
      filename: '[name].css',
    }),

    new WebpackNotifierPlugin({
      title: 'Lagune Renderer',
      contentImage: path.resolve("./resources/lagune.png"),
      alwaysNotify: true,
    }),
  ],

  devServer: {
    port: 8080,
    hot: true,
    inline: true,
    compress: true,
    index: 'index.html',
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      ignored: /node_modules/,
    }
  }
};

module.exports = config;
