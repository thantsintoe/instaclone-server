const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const { asyncErrorHandlerMiddleware } = require('./util');
const R = require('ramda');

exports.createPost = asyncErrorHandlerMiddleware(async (req, res, next) => {
  const inputPost = req.body.post;
  const { user } = req;

  const newPost = await new Post({
    ...inputPost,
    owner: user._id,
    comment: [],
  });

  await newPost.save();
  res.response = {
    code: 200,
    message: 'New Post successfully created...',
    post_id: newPost._id,
  };
  next();
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

