const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const { asyncErrorHandlerMiddleware, MayBe } = require('./util');
const passport = require('passport');
const R = require('ramda');


exports.createPost = asyncErrorHandlerMiddleware(async (req, res, next) => {
  const inputPost = req.body.post;
  const { user } = req;

  const createNewPost = async (user, post) => {
    const createdPost = await new Post({
      ...inputPost,
      owner: user._id,
      comment: [],
    });

    try {
      return await createdPost.save();
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const setSuccessResponse = async (post) => {
    const createdPost = await post;
    res.status(200);
    res.response = {
      code: 200,
      message: 'New Post successfully created...',
      post_id: createdPost._id,
    };
    next();
  };

  const setFailResponse = () => {
    res.status(501);
    res.response = {
      code: 501,
      error: 'Please input correct info to create post',
    };
    next();
  };

  const addPostToDB = R.pipe(createNewPost, setSuccessResponse);

  if (!R.isNil(inputPost)) {
    addPostToDB(user, inputPost);
  } else {
    setFailResponse();
  }
});

exports.getAllPost = asyncErrorHandlerMiddleware(async (req, res, next) => {
  const posts = await Post.find({})
    .populate({ path: 'owner', model: User })
    .populate({
      path: 'comment',
      model: Comment,
      populate: {
        path: 'owner',
        model: User,
      },
    });

  res.response = {
    code: 200,
    message: 'success',
    posts,
  };
  next();
});

exports.getPostById = asyncErrorHandlerMiddleware(async (req, res, next) => {
  const post = await Post.findById(req.params.post_id)
    .populate({ path: 'owner', model: User })
    .populate({
      path: 'comment',
      model: Comment,
      populate: {
        path: 'owner',
        model: User,
      },
    });
  res.response = {
    code: 200,
    message: 'success',
    post,
  };
  next();
});

