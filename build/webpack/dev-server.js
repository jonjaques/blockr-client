import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import config from './dev'

const options = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: {"Access-Control-Allow-Origin": "*"},
  stats: {colors: true}
}

const compiler = webpack(config)

export const host = 'localhost'
export const port = parseInt(process.env.API_PORT, 10) + 1

export function Server() {
  return new WebpackDevServer(compiler, options)
}

export default Server
