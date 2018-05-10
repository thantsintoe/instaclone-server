const { respond, ensureAuthenticated } = require('../components/util');
const commentComponent = require('../components/comment');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.post(
    '/api/comment',
    requireAuth,
    commentComponent.createComment,
    respond,
  );
  app.get(
    '/api/comment/post/:post_id',
    commentComponent.getAllCommentForPost,
    respond,
  );
};
