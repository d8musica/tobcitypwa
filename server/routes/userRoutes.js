const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/update_user', (req, res) => {
  const userId = req.user._id
  const userUpdate = req.body.user

  User.findOne( userId, function(err, user) {
    user.name = userUpdate.name
    user.city = userUpdate.city
    user.idcedula = userUpdate.idcedula
    user.email =  userUpdate.email
    user.cellphone = userUpdate.cellphone
    user.confirmed = true
    user.save()  
  })
})


module.exports = router
