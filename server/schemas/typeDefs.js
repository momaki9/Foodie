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
        description: String!
        ingredients: [Ingredient]
        image: String
        link: String
        rating: Int
    }

    type GroceryList {
        _id: ID
        items: [String]!
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
        description: String!
        ingredients: [IngredientData]!
        image: String
        link: String
        rating: Int
    }

    input GroceryInput {
        items: [String]!
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]!
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        signup(username: String!, email: String!, password: String!): Auth
        addRecipe(recipeData: RecipeInput!): User
        createGroceryList(listData: GroceryInput!): User
    }
`;

module.exports = typeDefs;