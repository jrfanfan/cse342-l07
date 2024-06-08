const express = require('express')
const passport = require('passport')
const router = express.Router()


// Auth with Google
router.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ]  }))
  
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/failure' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/dashboard')
      }
    )
module.exports = router