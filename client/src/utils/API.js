import axios from 'axios';

const API = {
  testApi: function () {
    return axios.get('/test');
  },
  spoonacularApi: function () {
    return axios.get('/api/spoonacular');
  },
};

export default API;
