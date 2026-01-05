import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../styling/RecipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  // track which ingredients are checked
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.id === id);
        setRecipe(found);

        // reset checkboxes when you load a new recipe
        setCheckedIngredients({});
      });
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  function toggleIngredient(idx) {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" loading="lazy" decoding ="async" />
      <p>{recipe.description}</p>

      <h2>Ingredients</h2>
      <ul className="ingredients-list">
        {recipe.ingredients.map((item, idx) => {
          const checked = !!checkedIngredients[idx];
          return (
            <li key={idx} className={`ingredient-item ${checked ? "checked" : ""}`}>
              <label className="ingredient-label">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleIngredient(idx)}
                />
                <span>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>

      <h2>Steps</h2>
      <ol className="steps-list">
        {recipe.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
}