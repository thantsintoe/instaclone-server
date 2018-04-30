const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const { asyncErrorHandlerMiddleware } = require('./util');
const R = require('ramda');

exports.createComment = asyncErrorHandlerMiddleware(async (req, res, next) => {
  const inputComment = req.body.comment;
  const { user } = req;

  const existingPost = await Post.findById(inputComment.post);

  if (existingPost) {
    const newComment = await new Comment({
      ...inputComment,
      owner: user._id,
    });

    await newComment.save();

    existingPost.comment.push(newComment._id);
    await existingPost.save();
    res.response = {
      code: 200,
      message: 'New Comment successfully created...',
      comment_id: newComment._id,
    };
    next();
  } else {
    throw new Error('Post not found...');
  }
});

exports.getAllCommentForPost = asyncErrorHandlerMiddleware(async (req, res, next) => {
  const posts = await Post.find({}).populate({ path: 'owner', model: User });

  res.response = {
    code: 200,
    message: 'success',
    posts,
  };
  next();
});

