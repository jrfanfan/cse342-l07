const GoogleStrategy = require('passport-google-oauth20').Strategy
const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../midleware/auth')
const mongoose = require('../models/User');
const passport = require('../utilities/passport')

const data = mongoose.findOne();
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
});
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', {
        name: "Welcome"
    })
});

// Logout route
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('https://google.com/')
    });
  });

  https://cs341-l05-l06.onrender.com/api-docs/
module.exports = router;