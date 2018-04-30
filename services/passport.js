const passport = require('passport');
const User = require('../models/user');
const { Strategy } = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { facebookConfig, googleConfig } = require('../config/config');

const baseURL = 'https://localhost:8443';

passport.use(new Strategy(
  {
    clientID: facebookConfig.clientID,
    clientSecret: facebookConfig.clientSecret,
    callbackURL: `${baseURL}/auth/facebook/callback`,
  },
  ((accessToken, refreshToken, profile, cb) => {
    User.findOne({ socialId: profile.id, socialPlatform: 'facebook' }, (err, existingUser) => {
      if (err) console.log(err);
      if (existingUser) {
        console.log('Existing User...');
        console.log(existingUser);
        return cb(err, existingUser);
      }
      User.create({
        socialId: profile.id,
        socialPlatform: 'facebook',
        displayName: profile.displayName,
      }, (error, newUser) => {
        console.log('New User...');
        console.log(newUser);
        return cb(err, newUser);
      });
    });
  }),
));

passport.use(new GoogleStrategy(
  {
    clientID: googleConfig.clientID,
    clientSecret: googleConfig.clientSecret,
    callbackURL: `${baseURL}/auth/google/callback`,
  },
  ((accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    User.findOne({ socialId: profile.id, socialPlatform: 'google' }, (err, existingUser) => {
      if (err) console.log(err);
      if (existingUser) {
        console.log('Existing User...');
        console.log(existingUser);
        return done(err, existingUser);
      }
      User.create({
        socialId: profile.id,
        socialPlatform: 'google',
        displayName: profile.displayName,
      }, (error, user) => {
        console.log(user);
        return done(error, user);
      });
    });
  }),
));
