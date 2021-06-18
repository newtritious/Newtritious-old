const User = require('../models/user');

module.exports = function (app) {
  app.get('/test', function (req, res) {
    return res.json({ test: 'success' });
  });

  app.post('/signup', async function (req, res) {
    const user = new User(req.body);

    try {
      await user.save();

      res.status(201).send({
        user
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
        email,
        password
      });

      if (!user) {
        return res.status(404).send('User does not exist');
      }
      res.status(200).send(user);
    } catch (e) {
      throw new Error(`Error: ${e}`);
    }
  });

  //this is a dummy route.  Feel free to change or replace this as needed.
  app.post('/search-req', async function (req, res) {
    console.log(req.body);
  });
};
