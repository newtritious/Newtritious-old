const passport = require('passport');
const { User, Recipe } = require('../models');
require('../services/passport');

module.exports = function (app) {
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
          data: 'No saved recipes. Try saving a recipe first!'
        });
      }

      res.status(200).json(recipes);
    }
  );

  /* ---------------------------- GET SINGLE RECIPE --------------------------- */
  // app.get(
  //   '/recipe/:id',
  //   passport.authenticate('jwt', { session: false }),
  //   async (req, res) => {
  //     const id = Number(req.params.id);
  //     const _id = req.user._id;

  //     try {
  //       const user = await User.findOne({
  //         _id
  //       });

  //       const savedRecipes = user.savedRecipes;

  //       let recipe = savedRecipes.find((element) => element.id === id);

  //       if (!recipe) return res.status(404).send(`Recipe not found`);

  //       res.status(200).json(recipe);
  //     } catch (e) {
  //       res.status(500).send(`Error: ${e}`);
  //     }
  //   }
  // );

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

        if (!hasRecipe) {
          recipe = await Recipe.create(req.body);
        }

        let isRecipeSavedToUser = user.savedRecipes.find(
          (element) => element === hasRecipe._id
        );

        if (!isRecipeSavedToUser) {
          recipe = user.savedRecipes.addToSet(hasRecipe);
        }

        await user.save();

        return res.status(201).json(recipe);
      } catch (e) {
        res.status(500).json(e);
      }
    }
  );

  // app.get(
  //   '/recipe/:id',
  //   passport.authenticate('jwt', { session: false }),
  //   async (req, res) => {
  //     const id = Number(req.params.id);
  //     const _id = req.user._id;

  //     try {
  //       const user = await User.findOne({
  //         _id
  //       });

  //       const savedRecipes = user.savedRecipes;

  //       let recipe = savedRecipes.find((element) => element.id === id);

  //       if (!recipe) return res.status(404).send(`Recipe not found`);

  //       res.status(200).json(recipe);
  //     } catch (e) {
  //       res.status(500).send(`Error: ${e}`);
  //     }
  //   }
  // );
};
