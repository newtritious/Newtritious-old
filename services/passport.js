const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    console.log('inside if statement');
    token = req.cookies['jwt'];
  }
  console.log(typeof token);

  return token;
};

const opts = {};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_STRING;

// const payload = jwt.verify(opts.jwtFromRequest, opts.secretOrKey);
// console.log(payload);

// authorization via jwt
passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById({ _id: payload._id }, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      return done(null, false);
    })
      .then((user) => {
        console.log(user);
        if (user) {
          return done(null, user);
        }
        return done(null, false, { message: 'inside try block.' });
      })
      .catch((err) => console.log('inside passport.use catch block', err));
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
        throw new Error(`LocalStrategy Error: ${e}`);
      }
    }
  )
);
