const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

const generateTokenForUser = (user) => {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timeStamp }, config.secret);
};
exports.signup = (req, res, next) => {
  const { username, password, email } = req.body;

  // send err if no username or password provided
  if (!username || !password) {
    return res.status(422).send({ error: 'Pls provide username and password' });
  }

  // send err if username already existed
  User.findOne({ username }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(422).send({ error: 'username is in use' });
    }
  });

  // create new user
  const user = new User({
    username,
    email,
    password,
  });

  // save user
  user.save((err) => {
    if (err) { return next(err); }
    return res.json({ token: generateTokenForUser(user) });
  });
};

exports.signin = (req, res) => {
  res.send({ token: generateTokenForUser(req.user) });
};
