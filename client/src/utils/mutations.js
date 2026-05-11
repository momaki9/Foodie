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
            description
        }
    }
`;