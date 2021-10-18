const passport = require('passport');
const { User, Recipe } = require('../models');
require('../services/passport');

module.exports = function (app) {
  app.post(
    '/recipe',
    passport.authenticate('jwt', { session: false }),
    async function (req, res) {
      const user = await User.findOne({
        _id: req.user._id
      });

      let savedRecipeIds = user.savedRecipes;
      let obj = {};
      let count = 1;

      const checkForDuplicates = (array) => {
        for (let i = 0; i < array.length; i++) {
          if (obj[array[i].id]) return false;

          obj[array[i].id] = count;
        }
        return true;
      };

      try {
        if (!checkForDuplicates(savedRecipeIds)) {
          return res.status(418).json({
            Error:
              'The server refuses to serve coffee because it is a teapot. In other words, you cannot save duplicate recipes.'
          });
        }

        const recipe = user.savedRecipes.addToSet(req.body);

        await user.save();

        res.status(201).json(recipe);
      } catch (e) {
        res.status(400).json(e);
      }
    }
  );

  app.get(
    '/recipe/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const _id = req.params.id;
      const owner = req.user._id;
      console.log(_id);
      try {
        const recipe = await Recipe.findOne({
          _id,
          owner
        });
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
