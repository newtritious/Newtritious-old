import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/API';

function Recipe() {
  const params = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    API.getRecipe(params.id)
      .then((results) => {
        if (results) {
          console.log(results.data);
          setRecipe(results.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);
  return (
    <div className="md:container mx-auto">
      <h1 className="text-center text-6xl mb-5 mt-5">{recipe.title}</h1>
      <img className="flex mx-auto" src={recipe.image} alt={recipe.title} />
      <ul className="flex gap-3	items-center mt-2">
        Dish Types:
        {recipe &&
          recipe.dishTypes?.map((dish, index) => (
            <li key={index} className="text-white font-bold py-3 rounded-full">
              {dish}
            </li>
          ))}
      </ul>
      <h2 className="text-4xl p-1 border-b-2 mt-5">Ingredients</h2>
      <ul>
        {Recipe &&
          recipe.extendedIngredients?.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
      </ul>
      <h2 className="text-4xl p-1 border-b-2 mt-5">Steps</h2>
      <ul>
        {recipe &&
          recipe?.analyzedInstructions?.[0].steps.map((step) => (
            <li key={step.number}>{step.step}</li>
          ))}
      </ul>
    </div>
  );
}

export default Recipe;
