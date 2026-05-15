const { gql } = require("apollo-server-express");

// TODO: do I need input types?

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        recipeCount: Int
        savedRecipes: [Recipe]
        createdRecipes: [Recipe]
        groceryLists: [GroceryList]
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
    }

    type GroceryItem {
        value: String!
        checked: Boolean
    }

    type GroceryList {
        _id: ID
        items: [GroceryItem]!
        title: String
    }
    
    type Ingredient {
        _id: ID
        name: String!
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
        items: [GroceryItemInput]!
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]!
        allRecipes: [Recipe]!
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        signup(username: String!, email: String!, password: String!): Auth
        addRecipe(recipeData: RecipeInput!): Recipe
        updateRecipe(_id: ID!, title: String, description: String, ingredients: [IngredientData], image: String, link: String, rating: Int): Recipe
        createGroceryList(listData: GroceryInput!): User
    }
`;

module.exports = typeDefs;