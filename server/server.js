const path = require('path')
const next = require('next')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const express = require('express')()
const compression = require('compression')
const travelsRoutes = require('./routes/travelsRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const cors = require('cors');
const bodyParser = require('body-parser')
const passport = require("passport")
const uid = require('uid-safe');
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('./models/user')



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false }, (err) => {
  if (err) return reject(err)
  console.log('Mongoooo!!!')
})  

const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dir: '.',
  dev
})
const handle = app.getRequestHandler()

app.prepare()
.then(async () => {
  
    const sessionConfig = {
      secret: uid.sync(18),
      cookie: {maxAge: 86400 * 1000},
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
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
      const { id,  displayName, _json  } = profile
      const userMatch = await User.findOne({ 'google.googleId': id })
      if(userMatch) {
        return done(null, userMatch)
      }
      if(!userMatch) {
        const newGoogleUser = await new User({
          'google.googleId': id,
          name: displayName,
          email: _json.email,
          'google.avatar': _json.picture
        })
        newGoogleUser.save((err, savedUser) => {
          return done(null, newGoogleUser)
        })
      }
    }))


    const facebookStrategy = (new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: [ 'id', 'displayName', 'picture.type(large)', 'emails' ]
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id,  displayName, emails, photos  } = profile
      const userMatch = await User.findOne({ 'facebook.facebookId': id })
      if(userMatch) {
        return done(null, userMatch)
      }
      if(!userMatch) {
        const newFacebookUser = await new User({
          'facebook.facebookId': id,
          name: displayName,
          email: emails[0].value,
          'facebook.avatar': photos[0].value
        })
        newFacebookUser.save((err, savedUser) => {
          return done(null, newFacebookUser)
        })
      }
    }))
    
    passport.use(googleStrategy)
    passport.use(facebookStrategy)
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
  
    passport.deserializeUser((id, done) => {
      User.findById(id).then(user => {
        done(null, user)
      })
    })
  

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
    express.use('/api', userRoutes)
    express.get('*', (req, res) => handle(req, res))

    express.listen(process.env.PORT, (err) => {
      if (err) throw err
      console.log(`TOBCITY is Ready on http://localhost:${process.env.PORT}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })