const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    "ignore":['./theming/index.ts'],
    "bundle":['./src/index.ts']
  },
  output: {
    path: path.join(__dirname, 'release'),
    filename: '[name].js',
    library:["Searchkit"],
    libraryTarget:"umd",
    publicPath: '',
    css: 'theme.css'
  },
  resolve: {
    extensions:[".js", ".ts", ".tsx","", ".webpack.js", ".web.js", ".scss"]
  },
  postcss: function () {
    return [autoprefixer]
  },
  plugins: [
  new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['require', 'export', '$super']
      },
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    })
  ],
  externals: {
    "react": "React",
    "react-dom":"ReactDOM"
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['ts'],
        include: [path.join(__dirname, 'src'),path.join(__dirname, 'theming')]
      }
    ]
  }
};
