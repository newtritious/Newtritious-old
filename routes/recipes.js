const passport = require('passport');
const { User, Recipe } = require('../models');
require('../services/passport');

module.exports = function (app) {
  /* ----------------------------- GET ALL RECIPES ---------------------------- */
  app.get(
    '/recipe',
    passport.authenticate('jwt', { session: false }),
    async function (req, res) {
      const user = await User.findOne({
        _id: req.user._id
      });

      const recipes = await Recipe.find().where('_id').in(user.savedRecipes);

      if (!recipes.length) {
        return res.status(404).json({
          message: 'No saved recipes. Try saving a recipe first!'
        });
      }

      res.status(200).json(recipes);
    }
  );

  /* ---------------------------- GET SINGLE RECIPE --------------------------- */
  app.get(
    '/recipe/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const spoonacularRecipeId = Number(req.params.id);
      const userId = req.user._id;

      try {
        const user = await User.findOne({
          _id: userId
        });

        let hasRecipe = await Recipe.findOne({ id: spoonacularRecipeId });

        const savedRecipes = user.savedRecipes;

        console.log(savedRecipes[0]);

        let recipe = savedRecipes.find(
          (element) => element.toString() === hasRecipe._id.toString()
        );

        if (!recipe) return res.status(404).send(`Recipe not found`);

        res.status(200).json(recipe);
      } catch (e) {
        res.status(500).send(`Error: ${e}`);
      }
    }
  );

  /* ------------------------------ SAVE A RECIPE ----------------------------- */
  app.post(
    '/recipe',
    passport.authenticate('jwt', { session: false }),
    async function (req, res) {
      let recipe;
      const spoonacularRecipeId = req.body.id;

      try {
        const user = await User.findOne({
          _id: req.user._id
        });

        let hasRecipe = await Recipe.findOne({ id: spoonacularRecipeId });

        // Database _ids are saved as objects, not strings, so string conversion must occur to compare.
        let isRecipeSavedToUser = user.savedRecipes.find(
          (element) => element.toString() === hasRecipe._id.toString()
        );

        if (isRecipeSavedToUser) {
          return res.status(400).json({
            error: 'Recipe is already saved to database.'
          });
        }

        recipe = user.savedRecipes.addToSet(hasRecipe);

        await user.save();
        res.status(201).json(recipe);
      } catch (e) {
        res.status(500).json(e);
      }
    }
  );
  /* ------------------------------ DELETE RECIPE ----------------------------- */

  app.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const spoonacularRecipeId = Number(req.params.id);
      const userId = req.user._id;
      try {
        const user = await User.findOne({
          _id: userId
        });

        const recipe = await Recipe.findOne({
          id: spoonacularRecipeId
        });

        if (!recipe) {
          return res.status(404).json({
            error: 'Recipe has not been saved to database.'
          });
        }

        let isRecipeSavedToUser = user.savedRecipes.find(
          (savedRecipe) => savedRecipe.toString() === recipe._id.toString()
        );

        if (!isRecipeSavedToUser) {
          return res.status(404).json({
            error: 'Recipe has not been saved to favorites.'
          });
        }

        user.savedRecipes = user.savedRecipes.filter(
          (savedRecipe) => savedRecipe.toString() !== recipe._id.toString()
        );

        await user.save();

        res.status(200).json({ savedRecipes: user.savedRecipes });
      } catch (e) {
        res.status(500).json(e.message);
      }
    }
  );
};
