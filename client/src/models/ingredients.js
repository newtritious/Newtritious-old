const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "You must name this ingredient"]
    },
    calories: {
        type: Number,
        required: true,
        min: [0, "The calories for this ingredients must be higher than zero."]
    },
    servingSize: {
        amount: { type: Number },
        unit: { type: String, required: [true, "Please type the serving size amount in oz, grams, cups, etc."] }
    },
    macros: [
        {
            amount: { type: Number },
            type: {
                type: String,
                default: "Total Fat"
            },
            unit: {
                type: String,
                default: "g"
            },
            subnutrients: [
                {
                    type: {
                        type: String,
                        deafult: "Saturated Fat"
                    },
                    amount: {
                        type: Number,
                        default: 0
                    },
                    unit: {
                        type: String,
                        default: "g"
                    }

                },
                {
                    type: {
                        type: String,
                        default: "Trans fat"
                    },
                    amount: {
                        type: Number,
                        default: 0
                    },
                    unit: {
                        type: String,
                        default: "g"
                    }
                }
            ]
        },
        {
            amount: {
                type: Number,
            },
            type: {
                type: String,
                default: "Cholesterol"
            },
            unit: { type: Number }
        },
        {
            amount: {
                type: Number,
            },
            type: {
                type: String,
                default: "Sodium"
            },
            unit: { type: Number }
        },
        {
            amount: {
                type: Number,
            },
            type: {
                type: String,
                default: "Carbohydrates"
            },
            unit: { type: Number },
            subnutrients: [
                {
                    type: {
                        type: String,
                        default: "Dietary Fiber"
                    },
                    amount: {
                        type: Number,
                    },
                    unit: { type: Number },
                },
                {
                    type: {
                        type: String,
                        default: "Total Sugars"
                    },
                    amount: {
                        type: Number,
                    },
                    unit: { type: Number },
                    subnutrients: [
                        {
                            type: {
                                type: String,
                                default: "Added Sugars"
                            },
                            amount: {
                                type: Number,
                            },
                            unit: { type: Number }
                        }
                    ]
                }
            ]
        },
        {
            amount: {
                type: Number,
            },
            type: {
                type: String,
                default: "Protein"
            },
            unit: { type: Number },
        },

    ],
    micros: [
        {
            type: {
                type: String,
                default: "Vitamin D"
            },
            amount: {
                type: Number,
            },
            unit: { type: Number }
        },
        {
            type: {
                type: String,
                default: "Calcium"
            },
            amount: {
                type: Number,
            },
            unit: { type: Number }
        },
        {
            type: {
                type: String,
                default: "Iron"
            },
            amount: {
                type: Number,
            },
            unit: { type: Number }
        },
        {
            type: {
                type: String,
                default: "Potassium"
            },
            amount: {
                type: Number,
            },
            unit: { type: Number }
        },
        {
            type: {
                type: String,
                default: "Vitamin C"
            },
            amount: {
                type: Number,
            },
            unit: { type: Number }
        },
        {
            type: {
                type: String,
                default: "Vitamin B6"
            },
            amount: {
                type: Number,
            },
            unit: { type: Number }
        }
    ],
    warning: {
        type: String,
        Default: "The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 Calories a day is used for general nutrition advice."
    }

})

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient