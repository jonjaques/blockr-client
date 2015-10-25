var fs = require('fs'),
  path = require('path'),
  filepath = path.resolve(__dirname, '../../webpack-stats.json');

module.exports = function writeStats(stats, env) {

  var publicPath = this.options.output.publicPath;

  var json = stats.toJson();

  // get chunks by name and extensions
  function getChunks(name, ext) {
    ext = ext || 'js';
    var chunk = json.assetsByChunkName[name];

    // a chunk could be a string or an array, so make sure it is an array
    if (!(Array.isArray(chunk))) {
      chunk = [chunk];
    }

    return chunk
      // filter by extension
      .filter(function (chunkName) {
        return path.extname(chunkName) === '.' + ext;
      })
      .map(function (chunkName) {
        return publicPath + chunkName;
      });
  }

  var script = getChunks('main', 'js');

  // Is there a way to get this dynamically so it doesn't depend on loader?
  var namePrefix = "./~/css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!./~/autoprefixer-loader?browsers=last 2 version!./~/sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true!";

  var content = {
    script: script
  };

  fs.writeFileSync(filepath, JSON.stringify(content));

};
