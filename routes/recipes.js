const passport = require('passport');
const { User, Recipe } = require('../models');
require('../services/passport');

module.exports = function (app) {
  app.post(
    '/recipe',
    passport.authenticate('jwt', { session: false }),
    async function (req, res) {
      // const recipe = await User.findOneAndUpdate(
      //   { _id: user._id },
      //   { $addToSet: { savedRecipes: body } },
      //   { new: true }
      // );
      const user = await User.findOne({
        _id: req.user._id
      });

      const recipes = user.savedRecipes;

      // Find a way to filter recipes based on recipes[index].id;
      // Filter out recipes so as to remove any duplicates based on id;
      
      // const filteredRecipes = recipes.filter(function (recipe, index) {
      //   return recipes.indexOf(recipe) === index;
      // });

      console.log(filteredRecipes);

      user.savedRecipes = filteredRecipes;

      console.log('hiiii');
      try {
        await user.save();

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
