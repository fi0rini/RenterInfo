
'use strict';
const passport = require('passport');
const session = require('express-session');
const express = require('express');
const googleplus = require('../env').googleplus;

const authserver = express();
const port = 4444;

// GOOGLE AUTHENTICATION SETTINGS
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CONSUMER_KEY = googleplus.key;
const GOOGLE_CONSUMER_SECRET = googleplus.secret;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CONSUMER_KEY,
    clientSecret: GOOGLE_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:4444/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      // console.log('25', profile);
      done(null, profile);
    });
  }
));

authserver.set('trust proxy', 'loopback');

authserver.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

authserver.use((req, res, next) => {
  console.log('URL:', req.url);
  console.log('SID:', req.sessionID);
  next();
});

// initialize passport
authserver.use(passport.initialize());
authserver.use(passport.session());

authserver.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }), (req, res) => {
  res.redirect('http://localhost:3000/');
});

authserver.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/?fail=1' }), (req, res) => {
  res.redirect('http://localhost:3000/');
});

authserver.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/');
});

authserver.listen(port, () => console.log('listening on *:' + port));
