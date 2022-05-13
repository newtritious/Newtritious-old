import axios from 'axios';

const API = {
  testApi: function () {
    return axios.get('/api/user/test');
  },
  searchRecipes: function (searchQuery) {
    return axios.get('/api/spoonacular/search', {
      params: { searchInput: searchQuery }
    });
  },
  getRecipe: function (id) {
    return axios.get(`/api/spoonacular/${id}`);
  },

  getSavedRecipes: function () {
    return axios.get('/api/recipes/saved');
  },

  saveRecipe: function (recipe) {
    return axios.post('/api/recipes/', recipe);
  },

  deleteRecipe: function (id) {
    return axios.delete(`/api/recipes/${id}`);
  },

  login: async function (email, password) {
    try {
      const user = await axios
        .post('/api/user/login', {
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
        .get('/api/user/logout', {
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
    return axios.post('/api/user/signup', submission);
  }
};

export default API;
