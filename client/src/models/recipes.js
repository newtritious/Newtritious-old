const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    ingredients: {
        type: String,
        trim: true
    },
    instructions: {
        type: String,
        trim: true
    },
    pictures: {
        //what do we put here
    }

})

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe
