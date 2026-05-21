const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");

const groceryListSchema = require("./GroceryList");
const SavedRecipeSchema = require("./SavedRecipe")

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please provide a valid email address']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        savedRecipes: [SavedRecipeSchema],
        createdRecipes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Recipe'
            }
        ],
        groceryLists: [groceryListSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    try {
        if (this.isNew || this.isModified('password')) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('recipeCount').get(function () {
    return this.createdRecipes.length;
})

const User = model('User', userSchema);
module.exports = User;