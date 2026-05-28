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
        title
        items {
            value
            checked
        }
        status
    }
   } 
`;

export const TOGGLE_GROCERY_ITEM = gql`
    mutation ToggleGroceryItem ($listId: ID!, $itemId: ID!) {
        toggleGroceryItem (listId: $listId, itemId: $itemId) {
            _id
            items {
                _id
                value
                checked
            }
        }
    }
`;

export const ADD_GROCERY_ITEM = gql`
    mutation AddGroceryItem($listId: ID!, $item: GroceryItemInput!) {
        addGroceryItem(listId: $listId, item: $item) {
            _id
            items {
                _id
                value
                checked
            }
        }
    }
`;

export const SET_ACTIVE_GROCERY_LIST = gql`
    mutation SetActiveGroceryList($listId: ID!) {
        setActiveGroceryList(listId: $listId) {
            _id
            title
            status
        }
    }
`;

export const DELETE_GROCERY_LIST = gql`
    mutation DeleteGroceryList($listId: ID!) {
        deleteGroceryList(listId: $listId) {
            title
        }
    }
`;

export const ADD_ITEMS_TO_GROCERY_LIST = gql`
    mutation AddItemsToGroceryList($listId: ID!, $items: [GroceryItemInput]!) {
        addItemsToGroceryList(listId: $listId, items: $items) {
            _id
            title
            status
            items {
                value
                checked
            }
        }
    }
`;