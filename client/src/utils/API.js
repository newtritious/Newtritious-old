import axios from 'axios';

const API = {
  testApi: function () {
    return axios.get('/test');
  },
  spoonacularApi: function () {
    return axios.get('/api/spoonacular');
  },
  getRecipe: function (recipe) {
    return axios.get("https://api.spoonacular.com/recipes/complexSearch?" + recipe + "&addRecipeInformation=true&apiKey=e1fe11e37d624c659e8460dbc5810299")
  },
};

export default API;
