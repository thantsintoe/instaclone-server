const R = require('ramda');
const MayBe = require('../lib/maybe');

exports.respond = (req, res) => {
  console.log('Before responding');
  res.json(res.response);
};

exports.asyncErrorHandlerMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch((err) => {
        console.log(err);
        return res.status(501).json({
          code: 501,
          error: err.message,
        });
      });
  };

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('Please signin to post...');
  res.status(401).json({
    code: 401,
    message: 'unauthorize',
  });
};

exports.MayBe = MayBe;
