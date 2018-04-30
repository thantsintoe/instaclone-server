const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
});

const commentModelClass = mongoose.model('comment', commentSchema);

module.exports = commentModelClass;
