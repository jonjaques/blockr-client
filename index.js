require('babel/register')({ stage: 0 })
var app, port, http = require('http')

global.__SERVER__ = true;

if (require("piping")()) {
  port = process.env.PORT || 3000
  app = require('./src/server/main')
  http.createServer(app).listen(port)
  console.log('Listening on ' + port)
}