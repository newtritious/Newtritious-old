const axios = require('axios');
const apiUri = `https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${process.env.SPOONACULAR_API_KEY}`;

/****** 
  Spoonacular API has a limit of 150 requests per day on the free tier 
******/

module.exports = function (app) {
  /**
   * get spoonacular pasta
   * @param {object} req
   * @param {object} res
   * @returns {array} list of pasta
   */
  app.get('/spoonacular', async function (_, res) {
    try {
      const response = await axios.get(apiUri);
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
  app.get('/spoonacular/search', async function (req, res) {
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
      // log any errors
      console.error(error);
      // set the status
      res.status(400).json(error);
    }
  });
};
