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