import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./../styling/RecipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.id === id);
        setRecipe(found);
        setCheckedIngredients({});
      });
  }, [id]);

  function toggleIngredient(idx) {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }

  // Build a downloadable text version
  const recipeText = useMemo(() => {
    if (!recipe) return "";

    const ingredients = recipe.ingredients.map((ing) => `- ${ing}`).join("\n");
    const steps = recipe.steps.map((s, i) => `${i + 1}. ${s}`).join("\n");

    return `${recipe.title}

${recipe.description || ""}

INGREDIENTS
${ingredients}

STEPS
${steps}
`;
  }, [recipe]);

  function onPrint() {
    window.print();
  }

  function onDownload() {
    const blob = new Blob([recipeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${recipe.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <div className="recipe-actions">
        <button type="button" onClick={onPrint} className="recipe-btn">
          🖨️
        </button>
        <button type="button" onClick={onDownload} className="recipe-btn recipe-btn--primary">
          ⬇️
        </button>
      </div>

      <h1>{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-image"
        loading="lazy"
        decoding="async"
      />
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