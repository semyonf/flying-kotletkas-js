const path = require('path');

module.exports = {
  entry: './src/index.ts',
  externals: {
    three: 'THREE'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    library: 'Kotletkas',
    libraryExport: 'Kotletkas',
    libraryTarget: 'umd',
    filename: 'flying-kotletkas.js',
    path: path.resolve(__dirname, 'dist'),
  },
};