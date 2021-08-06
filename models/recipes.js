const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  analyzedInstructions: [
    {
      name: {
        type: String
      },
      steps: [
        {
          equipment: [
            {
                id: {
                    type: Number
                }
            },
            {
                name: {
                    type: String
                }
            },
            {
                localizedName: {
                    type: String
                }
            },
            {
                image: {
                    type: String
                }
            },
          ]
        },
        {
          ingredients: [
            {
              id: {
                type: Number
              },
              image: {
                type: String
              },
              localizedName: {
                type: String
              },
              name: {
                type: String
              }
            }
          ]
        },
        {
          number: {
            type: Number
          }
        },
        {
          step: {
            type: String
          }
        }
      ]
    }
  ],
  cuisines: [
    {
      type: String
    }
  ],
  cheap: {
    type: Boolean
  },
  dairyFree: {
    type: Boolean
  },
  diets: [
    {
      type: String
    }
  ],
  dishTypes: [
    {
      type: String
    }
  ],
  glutenFree: {
    type: Boolean
  },
  healthScore: {
    type: Number
  },
  id: {
    type: Number
  },
  image: {
    // should I use a url parser npm package?
    type: String
  },
  lowFODmap: {
    type: Boolean
  },
  occassions: [
    {
      type: String
    }
  ],
  readyInMinutes: {
    type: Number
  },
  servings: {
    type: Number
  },
  summary: {
    type: String,
    trim: true
  },
  sustainable: {
    type: Boolean
  },
  title: {
    type: String,
    trim: true
  },

  vegan: {
    type: Boolean
  },
  vegetarian: {
    type: Boolean
  },
  weightWatcherSmartPoints: {
    type: Number
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
