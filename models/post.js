const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String },
  photo: { type: Object, default: {} },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

const postModelClass = mongoose.model('post', postSchema);

module.exports = postModelClass;
