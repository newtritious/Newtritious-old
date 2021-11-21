const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('../services/passport');

const signToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.SECRET_STRING, {
    expiresIn: '14 days'
  });
};

module.exports = function (app) {
  app.get('/test', function (req, res) {
    return res.json({ test: 'success' });
  });

  app.post('/signup', async function (req, res) {
    const user = new User(req.body);

    try {
      await user.save();

      const token = await user.generateAuthToken();

      res
        .status(201)
        .cookie('jwt', `${token}`, {
          httpOnly: true,
          sameSite: true
        })
        .send({
          user
        });
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.post(
    '/login',
    passport.authenticate('local', { session: false }),
    function (req, res) {
      if (req.isAuthenticated()) {
        const { _id, username, email } = req.user;
        const token = signToken(_id);
        res
          .cookie('jwt', token, {
            httpOnly: true,
            sameSite: true
          })
          .status(200)
          .send({
            username,
            email,
            _id
          });
      }
    }
  );

  app.get(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    function (req, res) {
      res.clearCookie('jwt');
      return res.json({ logout: 'logout complete', success: true });
    }
  );
};
