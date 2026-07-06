import { NavLink } from "react-router-dom";
import "../styling/NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1 className="navbar-title">Beez Bakes</h1>
          <p className="navbar-tagline">plant-based recipes worth sharing</p>
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
      </div>
    </nav>
  );
}