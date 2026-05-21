const { Schema, model } = require("mongoose");
const ingredientSchema = require("./Ingredient");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        summary: {
            type: String,
            required: true
        },
        instructions: {
            type: String,
            required: true
        },
        ingredients: [ingredientSchema],
        image: {
            type: String
        },
        link: {
            type: String
        },
        rating: {
            type: Number,
            default: 0
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;