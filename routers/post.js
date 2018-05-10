const { respond, ensureAuthenticated } = require('../components/util');
const postComponent = require('../components/post');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.post(
    '/api/post',
    requireAuth,
    postComponent.createPost,
    respond,
  );
  app.get(
    '/api/post',
    postComponent.getAllPost,
    respond,
  );

  app.get(
    '/api/post/:post_id',
    postComponent.getPostById,
    respond,
  );
};
