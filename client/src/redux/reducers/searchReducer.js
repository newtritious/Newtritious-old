const initialState = {
  status: 'idle',
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
export const SEARCH_RECIPES = 'search/searchRecipes';
export const RECIPES_LOADING = 'recipes/recipesLoading';
export const RECIPES_LOADED = 'recipes/recipesLoaded';
export const RECIPES_FAILED = 'recipes/recipesFailed';
export const IS_LOADING = 'recipes/recipeIsLoading';
export const FILTER_CATEGORY = 'filters/filtersCategory';
export const FILTER_DISHTYPE = 'filters/filterDishtype';

// selectors - think of selectors as an API for accessing data from Redux state
export const getRecipes = (state) => state.search.recipes;
export const getRecipeIngredients = (state) => state.search.ingredients;
export const getRecipeInstructions = (state) => state.search.instructions;
export const getIsLoading = (state) => state.search.isLoading;
export const getError = (state) => state.search.error;
export const getCategory = (state) => state.search.filters.category;
export const getDishType = (state) => state.search.filters.dishType;

// action creators - function that takes in data and returns a formatted action. Think of them as your API for modifying your data
export const searchRecipes = (recipes) => ({
  type: SEARCH_RECIPES,
  payload: recipes
});

// reducer
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RECIPES: {
      return {
        ...state,
        recipes: action.payload
      };
    }
    case RECIPES_LOADING: {
      return {
        ...state,
        status: 'loading'
      };
    }
    case RECIPES_LOADED: {
      return {
        ...state,
        status: 'idle',
        recipes: [...state.recipes, action.payload]
      };
    }
    case RECIPES_FAILED: {
      return {
        ...state,
        status: 'failed'
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
