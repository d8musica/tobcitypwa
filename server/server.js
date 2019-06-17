const path = require('path')
const next = require('next')
const compression = require('compression')
const travelsRoutes = require('./routes/travelsRoutes')
const authRoutes = require('./routes/authRoutes')
const cors = require('cors');
const bodyParser = require('body-parser')
const passport = require("passport")
const uid = require('uid-safe');
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err) => {
  // if (err) return reject(err)
  if (err) console.log('err: ', err);
  console.log('Mongoooo!!!')
})  

const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dir: '.',
  dev,
})
const handle = app.getRequestHandler()

app.prepare()
  .then(async () => {
    const session = require('express-session')
    const express = require('express')()

    const sessionConfig = {
      secret: uid.sync(18),
      cookie: {maxAge: 86400 * 1000},
      resave: false,
      saveUninitialized: true
    }
    express.use(session(sessionConfig))

    const googleStrategy = (new GoogleStrategy({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      profileFields: [ 'id', 'displayName', 'picture', 'emails', 'profile' ],
      enableProof: true,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      return done(null, profile)
    }))
    
    // const auth0Strategy = new Auth0Strategy({
    //   domain: process.env.AUTH0_DOMAIN,
    //   clientID: process.env.AUTH0_CLIENT_ID,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //   callbackURL: process.env.AUTH0_CALLBACK_URL
    // }, function(accessToken, refreshToken, extraParams, profile, done) {
    //   return done(null, profile)
    // })

    passport.use(googleStrategy)
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))

    express.use(passport.initialize())
    express.use(passport.session())
    express.use(compression())
    express.use(cors());
    express.use(bodyParser.json({ limit: '20mb' }))
    express.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
    express.get('/sw.js', (req, res) => {
      app.serveStatic(req, res, path.join(__dirname, '.next/sw.js'))
    })
    
    express.get('/precache-manifest.*', (req, res) => {
      app.serveStatic(req, res, path.join(__dirname, `.next/${req.url}`))
    })
    
    // const restrictAccess = (req, res, next) => {
    //   if (!req.isAuthenticated()) return res,redirect("/login")
    //   next()
    // }

    
    express.use('/auth', authRoutes)
    express.use('/api', travelsRoutes)
    express.get('*', (req, res) => handle(req, res))

    express.listen(process.env.PORT, (err) => {
      if (err) throw err
      console.log(`Ready on http://localhost:${process.env.PORT}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })