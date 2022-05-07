const router = require('express').Router();
const axios = require('axios');

/****** 
  Spoonacular API has a limit of 150 requests per day on the free tier 
******/

// module.exports = function (app) {
/**
 * get spoonacular pasta
 * @param {object} req
 * @param {object} res
 * @returns {array} list of pasta
 */
router.get('/', async function (_, res) {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    // send results with a status of 200
    res.status(200).json(response.data.results);
  } catch (error) {
    // log any errors
    console.error(error);
  }
});

/**
 * search spoonacular
 * @param {object} req
 * @param {object} res
 * @returns {array} List of food results (default limit = 10)
 */
router.get('/search', async function (req, res) {
  // get searchInput value from the search form
  const searchInput = req.query.searchInput;
  console.log(`Input Value: ${searchInput}`);
  try {
    // save the response in a variable with the search query and API key
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&addRecipeInformation=true&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    // send an OK status and the data as json
    res.status(200).json(response.data.results);
  } catch (error) {
    // log and send error
    console.error(error);
    res.status(400).json(error);
  }
});

/**
 * get recipe information by id
 * @param {object} req
 * @param {object} res
 * @returns {object} Object containing full information about a recipe
 */
router.get('/:id', async function (req, res) {
  // get id from the req.params
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    // send an OK status and the data as json
    res.status(200).json(response.data);
  } catch (error) {
    // log and send error
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
