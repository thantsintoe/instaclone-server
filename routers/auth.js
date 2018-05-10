const { respond, ensureAuthenticated } = require('../components/util');
const passport = require('passport');
const authentication = require('../components/authentication');
const passportService = require('../services/passport');

const successRedirectURL = 'http://localhost:3000';
const failureRedirectURL = 'http://localhost:3000/signin';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get(
    '/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: failureRedirectURL }),
    (req, res) => {
      console.log('FB Login Successful...Req.user is ');
      console.log(req.user);
      res.redirect(successRedirectURL);
    },
  );
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: failureRedirectURL }),
    (req, res) => {
      console.log('Google Login Successful...Req.user is ');
      console.log(req.user);
      res.redirect(successRedirectURL);
    },
  );

  app.get('/auth/currentuser', (req, res) => {
    if (req.user) {
      return res.json({
        code: 200,
        user: req.user,
      });
    }
    return res.json({
      code: 501,
      error: 'Please sign in first',
    });
  });

  app.post('/signin', requireSignin, authentication.signin);
  app.post('/signup', authentication.signup);
};
