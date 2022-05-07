import axios from 'axios';

const API = {
  testApi: function () {
    return axios.get('/user/test');
  },
  searchRecipes: function (searchQuery) {
    console.log('searchRecipes Working');
    return axios.get('/spoonacular/search', {
      params: { searchInput: searchQuery }
    });
  },
  getRecipe: function (id) {
    console.log('getRecipes Working');
    return axios.get(`/spoonacular/${id}`);
  },

  getSavedRecipes: function () {
    console.log('getSavedRecipes Working');
    return axios.get('/recipes/saved');
  },

  saveRecipe: function (recipe) {
    console.log('saveRecipe Working');
    return axios.post('/recipes/', recipe);
  },

  deleteRecipe: function (id) {
    console.log('deleteRecipe Working');
    return axios.delete(`/recipes/${id}`);
  },

  login: async function (email, password) {
    console.log('login Working');
    try {
      const user = await axios
        .post('/user/login', {
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
    console.log('logout Working');
    try {
      const user = await axios
        .get('/user/logout', {
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
    console.log('signup Working');
    return axios.post('/user/signup', submission);
  }
};

export default API;
