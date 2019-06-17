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
  newTravel.date = sanitizeHtml(newTravel.date);
  newTravel.plate = sanitizeHtml(newTravel.plate);
  newTravel.price = sanitizeHtml(newTravel.price);
  newTravel.model = sanitizeHtml(newTravel.model);
  newTravel.content = sanitizeHtml(newTravel.content);
  newTravel.sits = sanitizeHtml(newTravel.sits);
  newTravel.nameFrom = sanitizeHtml(newTravel.nameFrom);
  newTravel.nameTo = sanitizeHtml(newTravel.nameTo);
  newTravel.latFrom = sanitizeHtml(newTravel.latFrom);
  newTravel.lngFrom = sanitizeHtml(newTravel.lngFrom);
  newTravel.latTo = sanitizeHtml(newTravel.latTo);
  newTravel.lngTo = sanitizeHtml(newTravel.lngTo);
  newTravel.polyline = sanitizeHtml(newTravel.polyline)
  newTravel.author = req.body.userId;
  console.log('newTravel: ', newTravel)
  newTravel.save((err1, savedTravel) => {
    console.log('err1: ', err1);
    console.log('savedTravel: ', savedTravel);
    if (err1) return console.log(err1)    
    if (err1) return res.json({err1});
    Travel.populate(savedTravel, { path: 'author' });
    return res.json({ travel: savedTravel });
  });
})

router.get('/travels', (req, res) => {
  Travel.find()
    .sort('-dateAdded')
    .populate('passenger')
    .exec()
    .then (
      travels => {
        return res.json({ travels })
      }
    )
})
router.get('/users', (req, res) => {
  console.log(User.find())
  User.find()
    .then (
      users => {
        console.log(users)
        return res.json({ users:'up' })
      }
    )
})

module.exports = router