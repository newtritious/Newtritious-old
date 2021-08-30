const passport = require('passport');
const { Recipe } = require('../models');
require('../services/passport');

module.exports = function (app) {
  app.post(
    '/recipes',
    passport.authenticate('jwt', { session: false }),
    async function (req, res) {
      const recipe = await new Recipe(req.body);

      try {
        await recipe.save();

        console.log(recipe);

        res.status(201).send(recipe);
      } catch (e) {
        res.status(400).send(e);
      }
    }
  );
};
