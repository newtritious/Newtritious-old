import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import searchReducer from './search/searchReducer';
import userReducer from './user/userReducer';

const middleware = [logger, thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export const store = createStore(
  combineReducers({
    // Define a top-level state field named `search`, handled by `searchReducer`
    search: searchReducer,
    // Define a top-level state field named `user`, handled by `userReducer`
    user: userReducer
  }),
  composeWithDevTools(applyMiddleware(...middleware))
);
