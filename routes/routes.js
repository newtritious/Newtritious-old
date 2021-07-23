const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../services/passport');

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
          httpOnly: true
        })
        .send({
          user,
          token
        });
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.post('/login', passport.authenticate('local', { session: false }), function (req, res) {
      const signToken = userId => {
        return jwt.sign({
          sub: userId
        }, process.env.SECRET_STRING)
      }

      if (req.isAuthenticated()) {
        const { _id, username, email } = req.user;
        const token = signToken(_id);
        res.cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
        }).status(200).send({
          username,
          email,
        });
      }
      

      // const email = req.body.email;
      // const password = req.body.password;

      // console.log('inside login route');
      // try {
      //   const user = await User.findOne({
      //     email
      //   });

      //   if (!user) {
      //     return res.status(404).send('User does not exist');
      //   }

      //   const token = await user.generateAuthToken();

      //   user.comparePasswords(password, (err, isMatch) => {
      //     if (err) throw err;
      //     if (!isMatch) return res.status(401).send();

      //     res.status(200).send({
      //       user,
      //       token
      //     });
      //   });
      // } catch (e) {
      //   throw new Error(`Error: ${e}`);
      // }
    }
  );

  app.get(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    async function (req, res) {
      console.log('middleware has passed already.');
      res.clearCookie('jwt');
      return res.json({ logout: 'logout complete' });
    }
  );
};
