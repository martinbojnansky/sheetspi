const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/backend.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'backend.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'backend'
  },
};