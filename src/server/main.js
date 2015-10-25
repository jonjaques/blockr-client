import express               from 'express'
import compression           from 'compression'
import bodyparser            from 'body-parser'
import path                  from 'path'
import React                 from 'react'
import { renderToString }    from 'react-dom/server'
import fs                    from 'fs'

import Master                from '../lib/components/master'
import Application           from '../lib/components/application'

const app = express()

app.use(compression())
app.use(bodyparser.json())
app.use('/assets', express.static(path.resolve('assets')))

const loadCssSnippet = fs.readFileSync(
  require.resolve('../../assets/perf/loadcss.js'))

app.get('/*', (req, res)=> {
  let inline = require('../../assets/perf/inline.json')
  res.send(
    renderToString(
      <Master 
        asyncCss={loadCssSnippet} 
        inlineCss={inline.css} 
        component={<Application />}
      />
    )
  )
})

export default app;
