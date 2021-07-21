import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import theme from '../theme';
import API from '../utils/API';

function Recipe() {
  const params = useParams();
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    API.spoonacularApiRecipe(params.id)
      .then((results) => {
        if (results) {
          console.log(results.data);
          setRecipe(results.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <ul>
        {recipe.dishTypes.map((dish) => (
          <li>{dish}</li>
        ))}
      </ul>
      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li>{ingredient.original}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recipe;
