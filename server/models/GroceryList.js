const { Schema, model } = require("mongoose");

const groceryListSchema = new Schema(
    {
        title: {
            type: String
        },
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
        status: {
            type: String,
            enum: ["active", "archived", "inactive"],
            default: "inactive",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { 
        timestamps: true
    }
);

const GroceryList = model("GroceryList", groceryListSchema);
module.exports = GroceryList;