import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_RECIPE = gql`
    mutation AddRecipe($recipeData: RecipeInput!) {
        addRecipe(recipeData: $recipeData) {
            _id
            title
            summary
            instructions
            image
            link
        }
    }
`;

export const SIGN_UP = gql`
    mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_RECIPE = gql`
    mutation SaveRecipe($savedRecipeData: SavedRecipeInput!) {
        saveRecipe(savedRecipeData: $savedRecipeData) {
            username
            _id
            savedRecipes {
                title
                image
                source
                sourceId
            }
        }
    }
`;

export const CREATE_GROCERY_LIST = gql`
   mutation CreateGroceryList($listData: GroceryInput!) {
    createGroceryList(listData: $listData) {
        _id
        username
    }
   } 
`;