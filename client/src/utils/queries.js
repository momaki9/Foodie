import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
        _id
        username
        savedRecipes {
          sourceId
          title
          image
          source
        }
        createdRecipes {
          _id
          title
          image
        }
    }
  }  
`;

// returns all user-created recipes
export const ALL_RECIPES = gql`
  query AllRecipes {
    allRecipes {
      _id
      title
      summary
      instructions
      link
      rating
      ingredients {
        _id
        amount
        name
        unit
      }
      author {
        recipeCount
        username
      }
      link
      rating    
    }
  }    
`;
// Spoonacular recipe
export const GET_RECIPE_BY_ID = gql`
  query GetRecipeById($id: Int!) {
    getRecipeById(id: $id) {
      id
      title
      image
      servings
      readyInMinutes
      cookingMinutes
      sourceName
      summary
      instructions
      spoonacularScore
      spoonacularSourceUrl
      extendedIngredients {
        id
        name
        amount
        unit
      }
    }
  }
`;

// local or user created recipe
export const GET_MY_RECIPE_BY_ID = gql`
  query GetMyRecipeById($id: ID!) {
    getMyRecipeById(id: $id) {
      _id
      title
      summary
      instructions
      ingredients {
        name
        amount
        unit
      }
      image
      link
      rating
    }
  }
`;

// gets recipes from spoonacular
export const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      id
      title
      image
      instructions
      sourceName
      spoonacularScore
      aggregateLikes
    }
  }
`;
// search for spoonacular recipes
export const SEARCH_RECIPES = gql`
  query SearchRecipes($term: String!) {
    searchRecipes(term: $term) {
      id
      title
      aggregateLikes
      sourceName
      image
      spoonacularScore
    }
  }
`;

export const MY_GROCERY_LISTS = gql`
  query MyGroceryLists {
    myGroceryLists {
      _id
      title
      items {
        value
        checked
      }
      status
      createdAt
    }
  }
`;

// getGroceryList
export const GET_GROCERY_LIST = gql`
  query GetGroceryList($id: ID!) {
    getGroceryList(id: $id) {
      _id
      title
      status
      items {
        _id
        value
        checked
      }
    }
  }
`;

export const MY_ACTIVE_GROCERY_LIST = gql`
  query MyActiveGroceryList {
    myActiveGroceryList {
      _id
      title
      items {
        value
        checked
      }
      status
      createdAt  
    }
  }
`;