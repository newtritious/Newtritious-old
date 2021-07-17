// const express = require('express');
// const passportJwt = require('../services/passport');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const cookieExtractor = function (req) {
  let token = null;

  const cookie = req.headers.cookie
    .split('; ')
    .find((row) => row.startsWith('jwt=Bearer%20'))
    .split('%20')[1];

  if (req && req.headers.cookie) {
    token = cookie;
  }

  return token;
};

const auth = async (req, res, next) => {
  const opts = {};

  opts.jwtFromRequest = cookieExtractor(req);
  opts.secretOrKey = process.env.SECRET_STRING;
  
  const payload = jwt.verify(opts.jwtFromRequest, opts.secretOrKey);
  console.log(payload)

  try {
    passport.use(
      new JwtStrategy(opts, function (jwt_payload, done) {
        console.log('opts');
        let user = User.findById({_id: jwt_payload.sub})
        console.log(user)
    
        User.findById(jwt_payload.sub)
          .then((user) => {
            if (user) {
              console.log(user);
              return done(null, user);
            }
            console.log('hhhhhhh');
            return done(null, false, { message: 'inside try block.' });
          })
          .catch((err) => console.log(err));
      })
    );
    next();
  } catch (e) {
    console.log(`Inside middleware catch block: ${e}`);
  }
};

module.exports = auth;
