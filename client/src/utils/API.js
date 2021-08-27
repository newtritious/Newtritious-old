import axios from 'axios';

const API = {
  testApi: function () {
    return axios.get('/test');
  },
  searchRecipes: function (searchQuery) {
    return axios.get('/spoonacular/search', {
      params: { searchInput: searchQuery }
    });
  },
  getRecipe: function (id) {
    return axios.get(`/spoonacular/${id}`);
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
      throw new Error(`Error: ${e}`);
    }
  },
  logout: async function () {
    try {
      const user = await axios
        .get('/logout', {
          cookies: document.cookie
        })
        .catch((error) => {
          if (error.response.status === 500) alert('Cannot logout');
        });

      if (!user) return;

      console.log(user);
      return user;
    } catch (e) {
      throw new Error(`Error: ${e}`);
    }
  },
  signup: function (submission) {
    return axios.post('/signup', submission)
  }
};

export default API;
