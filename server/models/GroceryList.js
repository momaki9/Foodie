const { Schema } = require("mongoose");

const groceryListSchema = new Schema(
    {
        items: [
            {
                type: String,
                required: true
            }
        ],
        title: {
            type: String
        }
    }
);

module.exports = groceryListSchema;