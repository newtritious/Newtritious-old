const User = require('../models/user');
const auth = require('../middleware/auth');

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
        .cookie('jwt', `Bearer ${token}`, {
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

  app.post('/login', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await User.findOne({
        email
      });

      if (!user) {
        return res.status(404).send('User does not exist');
      }

      const token = await user.generateAuthToken();

      user.comparePasswords(password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) return res.status(401).send();

        res.status(200).send({
          user,
          token
        });
      });
    } catch (e) {
      throw new Error(`Error: ${e}`);
    }
  });

  app.post('/logout', auth, async function (req, res) {
    console.log('middleware has passed already.');
  });

  //this is a dummy route.  Feel free to change or replace this as needed.
  app.post('/search-req', async function (req, res) {
    console.log(req.body);
  });
};
