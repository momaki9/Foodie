const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        link: {
            type: String
        },
        rating: {
            type: Number
        }
    }
);

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe;