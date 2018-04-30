const { respond, ensureAuthenticated } = require('../components/util');
const commentComponent = require('../components/comment');

module.exports = (app) => {
  app.post(
    '/api/comment',
    // ensureAuthenticated,
    commentComponent.createComment,
    respond,
  );
  app.get(
    '/api/comment/post/:post_id',
    commentComponent.getAllCommentForPost,
    respond,
  );
};
