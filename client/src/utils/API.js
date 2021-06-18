import axios from 'axios';

const API = {
  testApi: function () {
    return axios.get('/test');
  },

  spoonacularApi: function () {
    return axios.get('/api/spoonacular');
  },

  login: async function (email, password) {
    try {
      const user = await axios.post('/login', {
        email,
        password
      });

      console.log(user);
    } catch (e) {
      throw new Error(`Error: ${e}`);
    }
  }
};

export default API;
