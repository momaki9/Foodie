const { Schema } = require("mongoose");

const SavedRecipeSchema = new Schema(
    {
        sourceId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        source: {
            type: String,
            enum: ['local', 'spoonacular'],
            required: true
        },
        savedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: false
    }
);

module.exports = SavedRecipeSchema;