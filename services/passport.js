const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
require('dotenv').config();

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
};

const opts = {};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_STRING;

// authorization via jwt
passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      await User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false);
      });
    } catch (e) {
      throw new Error(`Passport Config Error: ${e}`);
    }
  })
);

// authenticate username/password
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        await User.findOne({ email }, (err, user) => {
          if (err) return done(err);
          if (!user) return done(null, false);
          user.comparePasswords(password, done);
        });
      } catch (e) {
        throw new Error(`Passport Config Error: ${e}`);
      }
    }
  )
);
