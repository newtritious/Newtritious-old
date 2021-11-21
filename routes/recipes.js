const passport = require('passport');
const { User } = require('../models');
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

        let recipe = savedRecipes.find((element) => element.id === req.body.id);

        if (!recipe) {
          recipe = user.savedRecipes.addToSet(req.body);
          await user.save();

          return res.status(201).json(recipe);
        }

        res.status(400).json({
          Error:
            'This error occurred because this recipe has been saved already.'
        });
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

        let recipe = savedRecipes.find((element) => element.id === id);

        if (!recipe) return res.status(404).send(`Recipe not found`);

        res.status(200).json(recipe);
      } catch (e) {
        res.status(500).send(`Error: ${e}`);
      }
    }
  );

  app.delete(
    '/recipe/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const id = Number(req.params.id);
      const _id = req.user._id;

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id },
          { $pull: { savedRecipes: { id } } },
          { new: true }
        );

        res.status(200).json(updatedUser);
      } catch (e) {
        res.status(500).send(`Error: ${e}`);
      }
    }
  );
};
