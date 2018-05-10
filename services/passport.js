const passport = require('passport');
const User = require('../models/user');
const { Strategy } = require('passport-facebook');
const LocalStrategy = require('passport-local');
const JwtStragety = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { facebookConfig, googleConfig } = require('../config/config');
const config = require('../config');

const baseURL = 'https://localhost:8443';

const facebookLoginStrategy = new Strategy(
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
);


let googleLoginStrategy = new GoogleStrategy(
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
);

// Local Stragety Setup
const localOption = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOption, (username, password, done) => {
  // verify username and password and call 'done' if correct
  User.findOne({ username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, (error, isMatch) => {
      if (error) { return done(error); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});


// JWT Strategy setup
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('token'),
  secretOrKey: config.secret,
};

const jwtLoginStrategy = new JwtStragety(jwtOptions, (payload, done) => {
  // check if user id in payload exist in database
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(facebookLoginStrategy);
passport.use(googleLoginStrategy);
passport.use(jwtLoginStrategy);
passport.use(localLogin);

