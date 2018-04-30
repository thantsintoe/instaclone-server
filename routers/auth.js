const { respond, ensureAuthenticated } = require('../components/util');
const passport = require('passport');
const authentication = require('../components/authentication');
const passportService = require('../services/passport');

module.exports = (app) => {
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get(
    '/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/loginwithfb' }),
    (req, res) => {
      console.log('FB Login Successful...Req.user is ');
      console.log(req.user);
      res.redirect('/');
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
    passport.authenticate('google', { failureRedirect: '/signin' }),
    (req, res) => {
      console.log('Google Login Successful...Req.user is ');
      console.log(req.user);
      res.redirect('/');
    },
  );

  app.get('/auth/currentuser', ensureAuthenticated, (req, res) => {
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

  app.get('*', (req, res) => {
    res.render('index');
  });
};
