const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = function (req) {
  let token = null;

  // const cookie = req.headers.cookie
  //   .split('; ')
  //   .find((row) => row.startsWith('jwt='))
  //   .split('=')[1];

  if (req && req.cookies) {
    console.log('inside if statement')
    token = req.cookies['jwt'];
  }
  console.log(token)
  return token;
};

const auth = async (req, res, next) => {
  const opts = {};

  opts.jwtFromRequest = cookieExtractor(req);
  opts.secretOrKey = process.env.SECRET_STRING;

  const payload = await jwt.verify(opts.jwtFromRequest, opts.secretOrKey);
  // console.log(payload)
  // console.log(payload._id)

  // let user = await User.findById({_id: payload._id})
  // console.log(user)

  try {
    console.log(payload._id);
    passport.use(
      new JwtStrategy(opts, function (payload, done) {

        User.findById({ _id: payload._id })
          .then((user) => {
            console.log(user);
            if (user) {
              console.log(user);
              return done(null, user);
            }
            console.log('hhhhhhh');
            return done(null, false, { message: 'inside try block.' });
          })
          .catch((err) => console.log(err, 'inside passport.use catch block'));
      })
    );
    console.log(payload._id);
    next();
  } catch (e) {
    console.log(`Inside middleware catch block: ${e}`);
  }
};

module.exports = auth;
