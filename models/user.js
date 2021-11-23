const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const recipeSchema = require('./recipes');

const UserSchema = new Schema(
  {
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
    savedRecipes: [recipeSchema],
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

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
    sub: user._id.toString()
  };
  const token = await jwt.sign(payload, process.env.SECRET_STRING, {
    expiresIn: '14 days'
  });

  user.tokens = [...user.tokens, { token }];

  await user.save();

  return token;
};

UserSchema.virtual('savedRecipesLength').get(function () {
  return this.savedRecipes.length;
});

UserSchema.methods.comparePasswords = function (password, cb) {
  const user = this;

  bcrypt.compare(password, user.password, function (err, isMatch) {
    if (err) return cb(err);
    if (!isMatch) return cb(null, isMatch);
    return cb(null, user);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
