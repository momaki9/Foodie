const { AuthenticationError } = require("apollo-server-express");
const { User, Recipe } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne(
                    {
                        _id: context.user._id
                    }
                    // TODO: what does the line below do/mean?
                ).select('-__v -password');
                return user;
            }
            throw new AuthenticationError("You need to be logged in");
        }
    },
    Mutation: {
        signup: async (parent, args) => {

            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne( { username });

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
        addRecipe: async (parent, { title, description, ingredients }) => {

            if (context.user) {
                const recipe = new Recipe( { title, description, ingredients });
                await User.findByIdAndUpdate("69ed670f5255c9a244042091", {
                    $push: { createdRecipes: recipe }
                });
                return recipe;
            }
            throw new AuthenticationError("You must be logged in first")
        },
        // TODO: figure out how to do the mutation below (if needed)
        // makeList: async () => {

        // }
    }
}

module.exports = resolvers;