import path          from 'path'
import webpack       from 'webpack'
import CleanPlugin   from 'clean-webpack-plugin'
import { pick }      from 'lodash'

const assetsPath = path.resolve('assets', 'js')
const host = 'localhost'
const port = parseInt(process.env.PORT) + 1 || 3001

const BUILD_CONSTANTS = {
  __CLIENT__: true,
  __SERVER__: false
}

export default {
  devtool: 'source-map',
  context: path.resolve(__dirname, '../..'),
  entry: {
    'main': [
      // 'webpack-dev-server/client?https://'+ host,
      // 'webpack/hot/only-dev-server',
      './src/client/main.js'
    ]
  },

  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `./assets/js/`
  },

  module: {
    loaders: [
      {
        test: /\/src\/lib\/async\/(components)/,
        loaders: [ 'bundle?lazy' ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'babel?stage=0&optional=runtime' ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },

  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],

    extensions: ['', '.json', '.js']
  },

  plugins: [

    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // new webpack.HotModuleReplacementPlugin(),

    new webpack.WatchIgnorePlugin([/\.json$/]),

    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin(BUILD_CONSTANTS),

    // optimizations
    new webpack.optimize.DedupePlugin(),

    // new webpack.optimize.UglifyJsPlugin(),

    new webpack.optimize.OccurenceOrderPlugin(),
    
    new CleanPlugin([assetsPath + '/*']),

  ]

}
