/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/*jshint esversion: 9 */

const isDevelopment = process.env.NODE_ENV === 'development';

const path = require( 'path' );

const TerserJSPlugin = require( 'terser-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );


module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',

  entry: {
    './js/wmwpaa-block': './src/wmwp-adobe-animate-block.tsx',
    './js/wmwpaa-front': './src/wmwp-adobe-animate-frontend.tsx',
  },

  plugins: [
    new DependencyExtractionWebpackPlugin(),
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
        enforce: 'pre',
      },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin( {} )],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  output: {
    path: path.resolve( __dirname, './dist' ),
    filename: '[name].js',
  },
};
