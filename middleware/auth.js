// const jwt = require('jsonwebtoken');
// const express = require('express');
// const passportJwt = require('../services/passport');
const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const auth = async (req, res, next) => {
  try {
    const opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET_STRING;

    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('opts');

        User.findById(jwt_payload.id)
          .then((user) => {
            if (user) {
              console.log(user);
              return done(null, user);
            }
            console.log('hhhhhhh');
            return done(null, false);
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
