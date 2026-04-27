const { Schema } = require("mongoose");

const ingredientSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        amount: {
            type: Number
        },
        unit: {
            type: String
        }
    }
);

module.exports = ingredientSchema;