const { AuthenticationError } = require("apollo-server-express");
const { User, Recipe, GroceryList } = require("../models");
const { getFeaturedCategory } = require("../utils/helper")
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
        getARecipeById: async (parent, { id }) => {
            return await Recipe.findOne({
                _id: id
            }).populate("author");
        },
        getMyRecipeById: async (parent, { id }, context) => {
            if (context.user) {
                const myRecipe = await Recipe.findOne({
                    _id: id,
                    author: context.user._id
                });
                return myRecipe;
            }
            throw new AuthenticationError("Not logged in!")
        },
        // gets recipes from spoonacular
        getRecipes: async () => {
            const featured = getFeaturedCategory();
            // previous end point for /explore page
            // const url = `https://api.spoonacular.com/recipes/complexSearch?sort=healthiness&number=100&apiKey=${process.env.SPOON_API_KEY}&addRecipeInformation=true`;

            const url = `https://api.spoonacular.com/recipes/complexSearch?${featured.params}&number=100&addRecipeInformation=true&apiKey=${process.env.SPOON_API_KEY}`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Spoonacular API error: ${response.status}`)
                }

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
            return Recipe.find().populate("author");
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
        },
        getGroceryList: async (parent, { id }, context) => {
            if (context.user) {
                return GroceryList.findOne({
                    _id: id,
                    user: context.user._id
                });
            }
            throw new AuthenticationError("Log-in first!")
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
        updateRecipe: async (parent, { recipeId, recipeData }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You must be logged in to update a recipe.")
            };

            const updatedRecipe = await Recipe.findOneAndUpdate(
                {
                    _id: recipeId,
                    author: context.user._id
                },
                { $set: recipeData },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedRecipe) {
                throw new AuthenticationError("Recipe or user not found")
            }

            return updatedRecipe;

        },
        deleteRecipe: async (parent, { recipeId }, context) => {
            if (context.user) {
                const deletedRecipe = await Recipe.findOneAndDelete({
                    _id: recipeId,
                    author: context.user._id
                });

                if (!deletedRecipe) {
                    throw new Error("Recipe not found");
                };

                await User.findByIdAndUpdate(context.user._id,
                    {
                        $pull: { createdRecipes: deletedRecipe._id }
                    }
                );

                return deletedRecipe;
            }
            throw new AuthenticationError("Not logged in!")

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
        },
        toggleGroceryItem: async (parent, { listId, itemId }, context) => {
            if (context.user) {
                const groceryList = await GroceryList.findOne({
                    _id: listId,
                    user: context.user._id
                });

                if (!groceryList) {
                    throw new Error("Grocery list not found!")
                }

                const item = groceryList.items.id(itemId);

                if (!item) {
                    throw new Error("Item not found!")
                }

                item.checked = !item.checked;

                await groceryList.save();
                return groceryList;
            }
            throw new AuthenticationError("Login first!")
        },
        addGroceryItem: async (parent, { listId, item }, context) => {
            if (context.user) {
                const groceryList = await GroceryList.findOne({
                    _id: listId,
                    user: context.user._id
                });

                if (!groceryList) {
                    throw new Error("Couldn't find a grocery list.")
                }

                groceryList.items.push(item);

                await groceryList.save();
                return groceryList;
            }
            throw new AuthenticationError("Login first!")
        },
        deleteGroceryItem: async (parent, { listId, itemId }, context) => {
            if (context.user) {
                return await GroceryList.findOneAndUpdate(
                    {
                        _id: listId,
                        user: context.user._id
                    },
                    {
                        $pull: {
                            items: { _id: itemId }
                        }
                    },
                    {
                        new: true
                    }
                )
            }
            throw new AuthenticationError("Not logged in")
        },
        setActiveGroceryList: async (parent, { listId }, context) => {
            if (context.user) {
                await GroceryList.updateMany(
                    {
                        user: context.user._id,
                        status: "active"
                    },
                    {
                        status: "inactive"
                    }
                );

                const groceryList = await GroceryList.findOneAndUpdate(
                    {
                        _id: listId,
                        user: context.user._id
                    },
                    {
                        status: "active"
                    },
                    {
                        new: true
                    }
                );
                if (!groceryList) {
                    throw new Error("Grocery list not found.")
                }
                return groceryList;
            }
            throw new AuthenticationError("You must be logged in to do this!")
        },
        deleteGroceryList: async (parent, { listId }, context) => {
            if (context.user) {
                // finds the grocery list with the given id (listId) of user
                const groceryList = await GroceryList.findOne({
                    _id: listId,
                    user: context.user._id
                });

                if (!groceryList) {
                    throw new Error("Not found!")
                }
                // returns true if the list is the active list
                const wasActive = groceryList.status === "active";
                // delete the same list
                await GroceryList.findOneAndDelete({
                    _id: listId,
                    user: context.user._id
                });
                // if the deleted list was the active list:
                if (wasActive) {
                    // find the most recent list
                    const nextActiveList = await GroceryList.findOne({
                        user: context.user._id
                    }).sort({ createdAt: -1 });
                    // if there is a recent list, make it the active list
                    if (nextActiveList) {
                        nextActiveList.status = "active";
                        await nextActiveList.save();
                    }
                }
                return groceryList;
            }
            throw new AuthenticationError("Login needed!");
        },
        addItemsToGroceryList: async (parent, { listId, items }, context) => {
            if (context.user) {
                const groceryList = await GroceryList.findOne({
                    _id: listId,
                    user: context.user._id
                });

                if (!groceryList) {
                    throw new Error("List not found!")
                };

                const currentItems = groceryList.items.map((item) => item.value.trim().toLocaleLowerCase());
                const newItems = items.map(item => ({
                    value: item.value.trim(),
                    checked: false
                }))
                    .filter(item => {
                        const normalized = item.value.toLowerCase();
                        return (
                            normalized && !currentItems.includes(normalized)
                        )
                    });
                groceryList.items.push(...newItems);

                await groceryList.save();

                return groceryList;

            }
            throw new AuthenticationError("Login to add items to your grocery list!")
        },
        removedSavedRecipe: async (parent, { sourceId }, context) => {
            if (context.user) {
                return User.findByIdAndUpdate(context.user._id, {
                    $pull: {
                        savedRecipes: { sourceId }
                    }
                },
                    {
                        new: true
                    }
                );
            }
            throw new AuthenticationError("You must be logged in first!")
        }
    }
}

module.exports = resolvers;