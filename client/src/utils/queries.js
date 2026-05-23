import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
        _id
        username
        savedRecipes {
          sourceId
          title
          image
          source
        }
    }
  }  
`;

// returns all user-created recipes
export const ALL_RECIPES = gql`
  query allRecipes {
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

export const GET_RECIPE_BY_ID = gql`
  query getRecipeById($id: Int!) {
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
// gets recipes from spoonacular
export const GET_RECIPES = gql`
  query getRecipes {
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
  query searchRecipes($term: String!) {
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
  query myGroceryLists {
    myGroceryLists {
      title
      items {
        value
        checked
      }
    }
  }
`;