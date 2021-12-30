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
      const spoonacularRecipeId = req.body.id;

      try {
        const user = await User.findOne({
          _id: req.user._id
        });

        let hasRecipe = await Recipe.findOne({ id: spoonacularRecipeId });

        if (hasRecipe) {
          return res.status(400).json({
            Error:
              'This error occurred because this recipe has been saved already.'
          });
        }

        let recipe = await Recipe.create(req.body)

        res.json(recipe);

        // .where('_id')
        // .in(user.savedRecipes)
        // .equals('61b82c32761c2b372359b937');

        // const recipe = Recipe.create(req.body);

        // check if recipe exists in Recipe database
        // if yes
        // get Recipe ObjectID
        // save to user's savedRecipes array
        // else
        // save to Recipe database
        // grab Recipe ObjectID
        // save to user's savedRecipes array

        // const hasRecipe = await Recipe.find()
        //   .where('_id')
        //   .in(user.savedRecipes)
        //   .equals('61b82c32761c2b372359b937');

        // console.log('======= hasRecipe: ', hasRecipe);

        // if (hasRecipe) {
        //   return res.status(400).json({
        //     Error:
        //       'This error occurred because this recipe has been saved already.'
        //   });
        // }

        // const savedRecipes = user.savedRecipes;

        // let recipe = savedRecipes.find((element) => element.id === req.body.id);

        // if (!recipe) {
        //   const savedRecipe = await Recipe.create(req.body); //returns { <recipe body> }
        //   recipe = user.savedRecipes.addToSet(savedRecipe); //returns [ <recipe._id> ]

        //   await user.save();

        //   return res.status(201).json(savedRecipe);
        // }

        // res.status(400).json({
        //   Error:
        //     'This error occurred because this recipe has been saved already.'
        // });
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
