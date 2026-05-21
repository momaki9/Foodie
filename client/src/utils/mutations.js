import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
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
    mutation addRecipe($recipeData: RecipeInput!) {
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
    mutation signup($username: String!, $email: String!, $password: String!) {
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
    mutation saveRecipe($savedRecipeData: SavedRecipeInput!) {
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