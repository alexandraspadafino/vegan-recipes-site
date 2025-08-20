import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styling/Cookies.css";

export default function MuffinsandLoafs() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => {
        const cookieRecipes = data.filter((recipe) =>
          recipe.title.toLowerCase().includes("muffin")
        );
        setRecipes(cookieRecipes);
      });
  }, []);

  return (
    <div className="cookies-page">
      <div className="cookie-grid">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="cookie-card"
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          >
            <h2 className="cookie-name">{recipe.title}</h2>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="cookie-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}