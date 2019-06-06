const path = require('path')
const next = require('next')
const nextAuth = require('next-auth')
const compression = require('compression')
const nextAuthConfig = require('./next-auth.config')

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3001
const app = next({
  dir: '.',
  dev,
})
const handle = app.getRequestHandler()

app.prepare()
  .then(async () => {
    const express = require('express')()
    const nextAuthOptions = await nextAuthConfig()
    const nextAuthApp = await nextAuth(app, nextAuthOptions)  
    
    express.use(compression())
    express.get('/sw.js', (req, res) => {
      app.serveStatic(req, res, path.join(__dirname, '.next/sw.js'))
    })

    express.get('/precache-manifest.*', (req, res) => {
      app.serveStatic(req, res, path.join(__dirname, `.next/${req.url}`))
    })

    express.get('*', (req, res) => handle(req, res))

    express.listen(PORT, (err) => {
      if (err) throw err
      console.log(`Ready on http://localhost:${PORT}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })