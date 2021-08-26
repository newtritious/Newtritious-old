const initialState = {
  userName: '',
  email: '',
  isLoggedIn: false
};

// action types - help to avoid action name typos
export const USER_LOGIN_LOADING = 'user/userLoginLoading';
export const USER_LOGIN_LOADED = 'user/userLoginLoaded';
export const USER_LOGIN_FAILED = 'user/userLoginFailed';
export const USER_LOGOUT = 'user/userLogout';

// selectors - think of selectors as an API for accessing data from Redux state

// action creators - function that takes in data and returns a formatted action. Think of them as your API for modifying your data

// reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default userReducer;
