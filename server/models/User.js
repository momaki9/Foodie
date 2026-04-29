const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");

const recipeSchema = require('./Recipe');
const groceryListSchema = require("./GroceryList");

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
        savedRecipes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Recipe'
            }
        ],
        createdRecipes: [recipeSchema],
        groceryLists: [groceryListSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

userSchema.pre('save', async function (next) {
    try {
        if (this.isNew || this.isModified('password')) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
            console.log(this)
        }
        // next();
    } catch (err) {
        console.error(err)
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