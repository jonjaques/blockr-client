import express               from 'express'
import compression           from 'compression'
import bodyparser            from 'body-parser'
import path                  from 'path'
import React                 from 'react'
import { renderToString }    from 'react-dom/server'

const app = express()

app.use(compression())
app.use(bodyparser.json())
app.use('/assets', express.static(path.resolve('assets')))

import Master from '../lib/components/master'

app.get('/*', (req, res)=> {
  let inline = require('../../assets/perf/inline.json')
  res.send(renderToString(<Master inlineCss={inline.css} />))
})

export default app;
