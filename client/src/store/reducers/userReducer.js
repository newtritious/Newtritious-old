const initialState = {
  username: '',
  email: ''
};

// action types - help to avoid action name typos
export const USER_SIGNUP = 'user/userSignup';
export const USER_LOGIN = 'user/userLogin';
export const USER_LOGOUT = 'user/userLogout';

// selectors - think of selectors as an API for accessing data from Redux state
export const getUsername = (state) => state.user.username;
export const getUserEmail = (state) => state.user.email;

// action creators - function that takes in data and returns a formatted action. Think of them as your API for modifying your data
export const userSignup = (email, password) => ({
  type: USER_SIGNUP,
  payload: { email, password }
});

export const userLogin = (username, email) => ({
  type: USER_LOGIN,
  payload: { username, email }
});

export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: {}
});

// reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP: {
      return { ...state };
    }
    case USER_LOGIN: {
      return { ...state, ...action.payload };
    }
    case USER_LOGOUT: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
