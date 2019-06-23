const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get("/google", passport.authenticate("google", {
  scope: ['profile email']
}))

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/profile' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/')
  })

router.get("/facebook", passport.authenticate("facebook"))

router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/profile' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/')
  })

router.get("/logout", (req, res) => {
  req.logout()
  
  res.redirect('/')
})

module.exports = router

