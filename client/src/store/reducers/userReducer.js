const initialState = {
  username: '',
  email: '',
  savedRecipes: new Set()
};

// action types - help to avoid action name typos
export const USER_SIGNUP = 'user/userSignup';
export const USER_LOGIN = 'user/userLogin';
export const UPDATE_SAVED_RECIPES = 'user/updateSavedRecipes';
export const USER_LOGOUT = 'user/userLogout';

// selectors - think of selectors as an API for accessing data from Redux state
export const getUsername = (state) => state.user.username;
export const getUserEmail = (state) => state.user.email;
export const getSavedRecipes = (state) => state.user.savedRecipes;

// action creators - function that takes in data and returns a formatted action. Think of them as your API for modifying your data
export const userSignup = (username) => ({
  type: USER_SIGNUP,
  payload: { username }
});

export const userLogin = (username) => ({
  type: USER_LOGIN,
  payload: { username }
});

export const updateSavedRecipes = (savedRecipes) => ({
  type: UPDATE_SAVED_RECIPES,
  payload: { savedRecipes }
});

export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: {}
});

// reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP: {
      return { ...state, ...action.payload };
    }
    case USER_LOGIN: {
      return { ...state, ...action.payload };
    }
    case UPDATE_SAVED_RECIPES: {
      return { ...state, ...action.payload };
    }
    case USER_LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
