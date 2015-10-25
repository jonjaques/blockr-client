import express               from 'express'
import path                  from 'path'
import React                 from 'react'
import { renderToString }    from 'react-dom/server'

const app = express()

app.use('/assets', express.static(path.resolve('assets')))

import Master from '../lib/components/master'

app.get('/*', (req, res)=> {
  res.send(renderToString(<Master />))
})

export default app;