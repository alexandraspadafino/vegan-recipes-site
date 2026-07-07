import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styling/NavBar.css";

export default function NavBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(recipes.filter((r) => r.title.toLowerCase().includes(q)).slice(0, 6));
  }, [query, recipes]);

  function handleSelect(id) {
    setQuery("");
    setResults([]);
    navigate(`/recipe/${id}`);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1 className="navbar-title">Beez Bakes</h1>
          <p className="navbar-tagline">plant-based recipes</p>
        </div>
        <div className="navbar-separator" />
        <div className="navbar-links">
          <NavLink to="/" end>Home</NavLink>
          <span className="nav-dot" />
          <NavLink to="/cookies">Cookies</NavLink>
          <span className="nav-dot" />
          <NavLink to="/muffins">Muffins</NavLink>
          <span className="nav-dot" />
          <NavLink to="/cakes">Cakes</NavLink>
        </div>
        <div className="navbar-search" ref={searchRef}>
          <input
            type="text"
            className="search-input"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {results.length > 0 && (
            <ul className="search-dropdown">
              {results.map((r) => (
                <li key={r.id} onMouseDown={() => handleSelect(r.id)}>
                  {r.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
