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
      const user = await axios
        .post('/login', {
          email,
          password
        })
        .catch((error) => {
          if (error.response.status === 401) alert('Credentials Failed');
          if (error.response.status === 404) alert('User Not Found');
        });

      if (!user) return;
      
      console.log(user);
      return user;
    } catch (e) {
      throw new Error(`Error: ${e}`)
    }
  }
};

export default API;
