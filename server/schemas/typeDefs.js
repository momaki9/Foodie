const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        recipeCount: Int
        savedRecipes: [SavedRecipe]
        createdRecipes: [Recipe]
    }
    
    type Recipe {
        _id: ID
        title: String!
        summary: String!
        instructions: String!
        ingredients: [Ingredient]!
        image: String
        link: String
        rating: Int
        author: User
    }

    type GroceryItem {
        _id: ID
        value: String!
        checked: Boolean
    }

    type GroceryList {
        _id: ID
        title: String
        items: [GroceryItem]!
        status: String!
        createdAt: String
        user: User
    }

    type SavedRecipe {
        sourceId: String!
        title: String!
        image: String
        source: String!
        savedAt: String
    }

    input SavedRecipeInput {
        sourceId: String!
        title: String!
        image: String
        source: String!
    }
    
    type Ingredient {
        _id: ID
        name: String!
        amount: Float
        unit: String
    }

    type SpoonIngredient {
        id: ID
        name: String
        amount: Float
        unit: String
    }

    input recipeIngredients {
        _id: ID
        name: String!
        amount: Float
        unit: String
    }

    input IngredientData {
        name: String!
        amount: Int
        unit: String
    }

    input RecipeInput {
        title: String!
        summary: String!
        instructions: String!
        ingredients: [IngredientData]!
        image: String
        link: String
        rating: Int
    }

    input GroceryItemInput {
        value: String!
        checked: Boolean
    }

    input GroceryInput {
        title: String
        items: [GroceryItemInput]!
    }

    type Auth {
        token: ID!
        user: User
    }

    type SpoonacularRecipe {
        id: ID
        title: String
        image: String
        sourceName: String
        instructions: String
        spoonacularScore: Float
        aggregateLikes: Int
        servings: Int
        readyInMinutes: Int
        cookingMinutes: Int
        summary: String
        extendedIngredients: [SpoonIngredient]
        spoonacularSourceUrl: String
    }

    type Query {
        me: User
        users: [User]!
        getRecipeById(id: Int!): SpoonacularRecipe
        getRecipes: [SpoonacularRecipe]
        searchRecipes(term: String!): [SpoonacularRecipe]
        allRecipes: [Recipe]!
        myGroceryLists: [GroceryList]!
        getGroceryList(id: ID!): GroceryList
        myActiveGroceryList: GroceryList
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        signup(username: String!, email: String!, password: String!): Auth
        addRecipe(recipeData: RecipeInput!): Recipe
        saveRecipe(savedRecipeData: SavedRecipeInput!): User
        updateRecipe(_id: ID!, title: String, description: String, ingredients: [IngredientData], image: String, link: String, rating: Int): Recipe
        createGroceryList(listData: GroceryInput!): GroceryList
        toggleGroceryItem(listId: ID!, itemId: ID!): GroceryList
        addGroceryItem(listId: ID!, item: GroceryItemInput!): GroceryList
        setActiveGroceryList(listId: ID!): GroceryList
        deleteGroceryList(listId: ID!): GroceryList
        addItemsToGroceryList(listId: ID!, items: [GroceryItemInput]!): GroceryList
    }
`;

module.exports = typeDefs;