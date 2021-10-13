const passport = require('passport');
const { Recipe } = require('../models');
require('../services/passport');

module.exports = function (app) {
  app.post(
    '/recipes',
    passport.authenticate('jwt', { session: false }),
    async function (req, res) {
      const user = req.user;
      const recipe = await new Recipe({
        ...req.body,
        owner: user._id
      });
      
      console.log(user)

      try {
        await recipe.save();

        console.log(recipe);

        res.status(201).send(recipe);
      } catch (e) {
        res.status(400).send(e);
      }
    }
  );

  app.get(
    '/recipe/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const recipe = await Recipe.findOne({ _id: req.params.id });
        console.log(recipe);
        // make a call to the database
        // to search for the recipe id that is stored in your db.
        res.status(200).send(`This is your recipe id: ${req.params.id}
          Here is your recipe:
          ${JSON.stringify(recipe)}
        `);
      } catch (e) {
        res.status(400).send(`Error: ${e}`);
      }
    }
  );
};
