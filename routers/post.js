const { respond, ensureAuthenticated } = require('../components/util');
const postComponent = require('../components/post');

module.exports = (app) => {
  app.post(
    '/api/post',
    ensureAuthenticated,
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
