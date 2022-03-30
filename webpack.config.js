const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

module.exports = {
  // Environment mode
  mode: 'development',

  // Entry point of app
  entry: resolveAppPath('src'),
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  output: {
    // Development filename output
    filename: 'static/js/bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },

  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath('public/index.html'),
    }),

    new CopyPlugin({
      patterns: [{ from: 'public/static/', to: 'static' }],
      options: {
        concurrency: 100,
      },
    }),
  ],
};
