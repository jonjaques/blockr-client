require('babel/register')({ stage: 0 })
var app, port, http = require('http')

global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

if (__DEVELOPMENT__) {
  if (!require('piping')({ ignore: /(\/\.|\/assets|\/build$)/ })) {
    return;
  }
}

port = process.env.PORT || 3000
app = require('./src/server/main')
http.createServer(app).listen(port)
console.log('Listening on ' + port)