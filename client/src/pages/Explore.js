import React, { useState, useEffect} from "react";
import RecipeCard from "../components/RecipeCard";
import { useInView } from 'react-intersection-observer';

const ExplorePage = () => {

  const [ recipes, setRecipes ] = useState([]);

  const getRecipes = async () => {
    let recipesURL = `https://api.spoonacular.com/recipes/complexSearch?sort=healthiness&number=100&apiKey=${process.env.REACT_APP_SPOON_API_KEY}&addRecipeInformation=true`;
    try {
      const response = await fetch(recipesURL);
      const data = await response.json();
      setRecipes(data.results);
    } catch (err) {
      console.error(err)
    }

  };

  useEffect(() => {
    getRecipes();
  }, [])

  const [visibleCount, setVisibleCount] = useState(25);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && visibleCount < recipes.length) {
      setVisibleCount((prev) => prev + 25)
    }
  }, [inView, recipes.length, visibleCount]);


  return (
    <section>
      <h1 className="text-center mb-4">Explore Page</h1>
      {recipes.slice(0, visibleCount).map((recipe) => (
        <RecipeCard
          id={recipe.id}
          imgLink={recipe.image}
          title={recipe.title}
          name={recipe.sourceName}
          score={recipe.spoonacularScore}
          likes={recipe.aggregateLikes}
        />
      ))}
      {visibleCount < recipes.length && (
        <div ref={ref} className="text-center py-4">
          Loading more recipes...
        </div>
      )}
    </section>
  )
}

export default ExplorePage;