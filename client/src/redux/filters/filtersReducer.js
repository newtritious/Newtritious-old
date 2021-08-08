const initialState = {
  category: [],
  dishType: []
};

// action types - help to avoid action name typos
export const FILTER_CATEGORY = 'filters/filtersCategory';
export const FILTER_DISHTYPE = 'filters/filterDishtype';

// selectors - think of selectors as an API for accessing data from Redux state
export const getCategory = (state) => state.filters.category;
export const getDishType = (state) => state.filters.dishType;

// reducer
const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default recipesReducer;
