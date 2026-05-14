const { Schema } = require("mongoose");

const groceryListSchema = new Schema(
    {
        items: [
            {
                value: {
                    type: String,
                    required: true
                },
                checked: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        title: {
            type: String
        }
    }
);

module.exports = groceryListSchema;