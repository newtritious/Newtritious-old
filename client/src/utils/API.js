import axios from 'axios';

const API = {
  testApi: function() {
    return axios.get("/test");
  }
};

export default API;