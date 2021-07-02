const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Required']
  },
  email: {
    type: String,
    required: [true, 'Required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Required']
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 8, function (err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const payload = {
    _id: user._id.toString()
  };
  const token = await jwt.sign(payload, process.env.SECRET_STRING);

  user.tokens = [...user.tokens, {token}];

  await user.save();

  return token;
};

UserSchema.methods.comparePasswords = function (password, cb) {
  const user = this;

  bcrypt.compare(password, user.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
