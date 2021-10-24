const passport = require('passport');
const { User, Recipe } = require('../models');
require('../services/passport');

module.exports = function (app) {
  app.post(
    '/recipe',
    passport.authenticate('jwt', { session: false }),
    async function (req, res) {
      try {
        const user = await User.findOne({
          _id: req.user._id
        });

        const savedRecipes = user.savedRecipes;

        for (let i = 0; i < savedRecipes.length; i++) {
          if (savedRecipes[i].id === req.body.id) {
            return res.status(400).json({
              Error:
                'This error occurred because this recipe has been saved already.'
            });
          }
        }

        const recipe = user.savedRecipes.addToSet(req.body);

        await user.save();

        res.status(201).json(recipe);
      } catch (e) {
        res.status(500).json(e);
      }
    }
  );

  app.get(
    '/recipe/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const id = Number(req.params.id);
      const _id = req.user._id;

      try {
        const user = await User.findOne({
          _id
        });

        const savedRecipes = user.savedRecipes;

        for (let i = 0; i < savedRecipes.length; i++) {
          const recipe = savedRecipes[i];

          if (recipe.id === id) {
            return res.status(200).json(recipe);
          }
        }

        res.status(404).send(`Recipe not found`);
      } catch (e) {
        res.status(500).send(`Error: ${e}`);
      }
    }
  );
};
