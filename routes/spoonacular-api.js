const axios = require('axios');
const apiUri = `https://api.spoonacular.com/recipes/complexSearch?query=beef&addRecipeInformation=true&apiKey=${process.env.API_KEY}`;

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
  app.get('/api/spoonacular', async function (req, res) {
    try {
      const response = await axios.get(apiUri);
      console.log(res);
      // log result to terminal
      console.log(response.data.results);
      // send results with a status of 200
      res.status(200).json(response.data.results);
    } catch (error) {
      // log any errors
      console.error(error);
    }
  });
};
