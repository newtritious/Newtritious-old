const initialState = {
  recipes: [],
  ingredients: [],
  instructions: [],
  error: null,
  isLoading: false,
  filters: {
    category: [],
    dishType: []
  }
};

// action types - help to avoid action name typos
export const RECIPE_REQUEST = 'recipes/recipeRequest';
export const RECIPE_SUCCESS = 'recipes/recipeSuccess';
export const RECIPE_FAIL = 'recipes/recipeFail';
export const IS_LOADING = 'recipes/recipeIsLoading';
export const FILTER_CATEGORY = 'filters/filtersCategory';
export const FILTER_DISHTYPE = 'filters/filterDishtype';

export const getRecipes = (state) => state.search.recipeList.recipes;
export const getRecipeIngredients = (state) =>
  state.search.recipeList.ingredients;
export const getRecipeInstructions = (state) =>
  state.search.recipeList.instructions;
export const getIsLoading = (state) => state.search.recipeList.isLoading;
export const getError = (state) => state.search.recipeList.error;
export const getCategory = (state) => state.search.filters.category;
export const getDishType = (state) => state.search.filters.dishType;

// reducer
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default searchReducer;
