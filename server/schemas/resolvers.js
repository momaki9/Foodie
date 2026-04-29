const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // if (context.user) {
            const user = await User.findOne(
                {
                    _id: "69f18a118a0f2f485c2ec5da"
                }
                // excludes the password
            ).select('-__v -password');
            return user;
            // }
            // throw new AuthenticationError("You need to be logged in");
        },
        users: async () => {
            return User.find();
        }
    },
    Mutation: {
        signup: async (parent, { username, email, password }) => {

            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError("Check your login info!");
            };

            const correctPass = await user.isCorrectPassword(password);

            if (!correctPass) {
                throw new AuthenticationError("Check your login info!");
            };

            const token = signToken(user);

            return { token, user };
        },
        addRecipe: async (parent, { recipeData }, context) => {

            // if (context.user) {
            // const recipe = new Recipe({ title, description, ingredients });
            const updatedUser = await User.findByIdAndUpdate(
                { _id: "69f18a118a0f2f485c2ec5da" },
                { $push: { createdRecipes: recipeData } },
                { new: true }
            );
            console.log(updatedUser)
            return updatedUser;
            // }
            // throw new AuthenticationError("You must be logged in first")
        },
        // TODO: remove id and replace with context.user._id
        createGroceryList: async (parent, { listData }, context) => {

            // if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: "69f18a118a0f2f485c2ec5da" },
                { $push: { groceryLists: listData } },
                { new: true }
            );
            console.log(updatedUser)
            return updatedUser;
            // }
            // throw new AuthenticationError("Log in first")
        }
    }
}

module.exports = resolvers;