const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

module.exports = {
  target: 'web',
  // Where webpack looks to start building the bundle
  // entry: Object.assign({}, ...entryPoints),
  entry: {
    index: `${paths.src}/index.ts`,
    slider: `${paths.src}/slider/SuperSlider.ts`,
    panel: `${paths.src}/configuration-panel/panel.ts`,
  },
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
      filename: `./index.html`,
      favicon: `${paths.public}/favicon.ico`,
    })
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.(js|ts)$/, use: ['babel-loader'], exclude: /node_modules/ },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i, type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][hash][ext]'
        },
        exclude: /fonts/,
      },
      //
      // // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg)$/, type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        },
        include: /fonts/,
      },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts','.js', '.json'],
    alias: {
      '~': `${paths.src}`,
    },
  },
}
