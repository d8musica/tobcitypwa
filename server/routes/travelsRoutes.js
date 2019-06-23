const express = require('express')
const router = express.Router()
const Travel = require('../models/travel')
const User = require('../models/user')
const sanitizeHtml = require('sanitize-html')

const restrictAccess = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/login")
  next()
}

router.post('/travels', restrictAccess, (req, res) => {
  const newTravel = new Travel(req.body.travel)
  newTravel.date = sanitizeHtml(newTravel.date)
  newTravel.plate = sanitizeHtml(newTravel.plate)
  newTravel.price = sanitizeHtml(newTravel.price)
  newTravel.model = sanitizeHtml(newTravel.model)
  newTravel.content = sanitizeHtml(newTravel.content)
  newTravel.sits = sanitizeHtml(newTravel.sits)
  newTravel.nameFrom = sanitizeHtml(newTravel.nameFrom)
  newTravel.nameTo = sanitizeHtml(newTravel.nameTo)
  newTravel.latFrom = sanitizeHtml(newTravel.latFrom)
  newTravel.lngFrom = sanitizeHtml(newTravel.lngFrom)
  newTravel.latTo = sanitizeHtml(newTravel.latTo)
  newTravel.lngTo = sanitizeHtml(newTravel.lngTo)
  newTravel.polyline = sanitizeHtml(newTravel.polyline)
  newTravel.author = req.user
  newTravel.save((err1, savedTravel) => {
    if (err1) return res.json({err1});
    Travel.populate(savedTravel, { path: 'author' });
    return res.json({ travel: savedTravel });
  });
})

router.get('/travels', (req, res) => {
  Travel.find()
    .sort('-dateAdded')
    .populate('author')
    .populate('passenger')
    .exec()
    .then (
      travels => {
        return res.json({ travels })
      }
    )
})

router.post('/add_passenger_to_travel', (req, res) => {
  const userId = req.user._id
  const {travelId} = req.body
  User.findById(userId, (err, user) => {
    if(err) {res.json({ err })}
    if(!user.confirmed) {res.send({ noCellError: 'Aun no confirmas tus datos'})}
    Travel.findOneAndUpdate({ _id: travelId }, {
      $push: { passenger: userId },
      $inc: { sits: -1 },
    }, 
    { new: true })
      .populate('passenger author')
      .exec(function(err, travel) {
        if(err) {res.json({ err })}
        return res.json({ travel })
      })
  })
})

router.post('/check_user_visit', (req, res) => {
  const userId = req.user._id
  User.findByIdAndUpdate({ _id: userId }, { $set: { firstTime: false }}, { new: true })
    .exec(function(err, user) {
      if(err) return res.json({ err })
      return res.json({ user })
    })
})

module.exports = router