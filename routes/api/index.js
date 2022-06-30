const router = require('express').Router();
const userRoutes = require('./user.js');
const recipeRoutes = require('./recipes.js');
const spoonacularRoutes = require('./spoonacular.js');

router.use('/user', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/spoonacular', spoonacularRoutes);

module.exports = router;
