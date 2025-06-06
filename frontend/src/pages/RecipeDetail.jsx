import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../styling/RecipeDetail.css"; // if you don't have this file yet, let's create it

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.id === id);
        setRecipe(found);
      });
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <p>{recipe.description}</p>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h2>Steps</h2>
      <ol>
        {recipe.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
}