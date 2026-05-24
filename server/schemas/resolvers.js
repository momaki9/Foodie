const { AuthenticationError } = require("apollo-server-express");
const { User, Recipe, GroceryList } = require("../models");
const { signToken } = require("../utils/auth");
const fetch = require("node-fetch");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)
                    .select('-__v -password').populate("createdRecipes");
                return user;
            }
            throw new AuthenticationError("You need to be logged in");
        },
        users: async () => {
            return User.find();
        },
        getRecipeById: async (parent, { id }) => {
            const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOON_API_KEY}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
                throw new Error("Failed to find the recipe.")
            }
        },
        // gets recipes from spoonacular
        getRecipes: async () => {
            const url = `https://api.spoonacular.com/recipes/complexSearch?sort=healthiness&number=100&apiKey=${process.env.SPOON_API_KEY}&addRecipeInformation=true`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data.results;
            } catch (err) {
                console.error(err);
                throw new Error("Failed to find recipes!")
            }
        },
        searchRecipes: async (parent, { term }) => {
            const url = `https://api.spoonacular.com/recipes/complexSearch?query=${term}&apiKey=${process.env.SPOON_API_KEY}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data.results;
            } catch (err) {
                console.error(err);
                throw new Error("Failed to find recipes!")
            }
        },
        allRecipes: async () => {
            return Recipe.find();
        },
        // might need to add .populate("user") to the data if needed
        myGroceryLists: async (parent, args, context) => {
            if (context.user) {
                const myGroceryLists = await GroceryList.find({
                    user: context.user._id
                }).sort({ createdAt: -1 });
                return myGroceryLists;
            }
            throw new AuthenticationError("You must be logged in first");
        },
        myActiveGroceryList: async (parent, args, context) => {
            if (context.user) {
                return GroceryList.findOne({
                    user: context.user._id,
                    status: "active"
                })
            }
            throw new AuthenticationError("Authentication error.");
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
            if (context.user) {
                const recipe = await Recipe.create({
                    ...recipeData,
                    author: context.user._id
                });
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { createdRecipes: recipe._id } }
                );

                return recipe;
            }
            throw new AuthenticationError("You must be logged in first");
        },
        updateRecipe: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError("You must be logged in to update a recipe.")
            };

            const recipe = await Recipe.findById(args._id);

            if (!recipe.author.equals(context.user._id)) {
                throw new AuthenticationError("You can only edit your own recipes.")
            };

            return Recipe.findByIdAndUpdate(
                args._id,
                args,
                { new: true, runValidators: true }
            )
        },
        createGroceryList: async (parent, { listData }, context) => {
            if (context.user) {
                await GroceryList.updateMany(
                    {
                        user: context.user._id,
                        status: "active"
                    },
                    {
                        status: "inactive"
                    }
                )

                const newGroceryList = await GroceryList.create({
                    ...listData,
                    status: "active",
                    user: context.user._id
                });
                return newGroceryList;
            }
            throw new AuthenticationError("Login first")
        },
        saveRecipe: async (parent, { savedRecipeData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $addToSet: { savedRecipes: savedRecipeData } },
                    {
                        new: true,
                        runValidators: true
                    }
                );
                return updatedUser;
            }
            throw new AuthenticationError("Login first!");
        }
    }
}

module.exports = resolvers;