const initialState = {
  recipes: [],
  currentRecipe: {
    ingredients: [],
    instructions: []
  },
  error: null,
  isLoading: false
};

// action types - help to avoid action name typos
export const RECIPE_REQUEST = 'recipes/recipeRequest';
export const RECIPE_SUCCESS = 'recipes/recipeSuccess';
export const RECIPE_FAIL = 'recipes/recipeFail';

// selectors - think of selectors as an API for accessing data from Redux state
export const getRecipes = (state) => state.recipesList.recipes;
export const getCurrentRecipe = (state) => state.recipesList.currentRecipe;
export const getRecipeIngredients = (state) =>
  state.recipesList.currentRecipe.ingredients;
export const getRecipeInstructions = (state) =>
  state.recipesList.currentRecipe.instructions;

// reducer
const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default recipesReducer;
