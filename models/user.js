const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  displayName: { type: String, unique: true },
  socialId: { type: String, unique: true },
  socialPlatform : { type: String }
});

const userModelClass = mongoose.model('user', userSchema);

module.exports = userModelClass;
