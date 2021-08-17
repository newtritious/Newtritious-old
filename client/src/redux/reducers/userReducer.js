const initialState = {
  userName: '',
  email: '',
  isLoggedIn: false
};

// action types - help to avoid action name typos
export const USER_LOGIN_REQUEST = 'user/userLoginRequest';
export const USER_LOGIN_SUCCESS = 'user/userLoginSuccess';
export const USER_LOGIN_FAIL = 'user/userLoginFail';
export const USER_LOGOUT = 'user/userLogout';

// selectors - think of selectors as an API for accessing data from Redux state

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default userReducer;
