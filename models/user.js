const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
});

// on save hook, encrypt password
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

const userModelClass = mongoose.model('user', userSchema);

module.exports = userModelClass;
