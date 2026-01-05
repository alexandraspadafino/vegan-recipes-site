import { Link } from "react-router-dom";
import "../styling/NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Beez Bakes</h1>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/cookies">Cookies</Link>
          <Link to="/muffins">Muffins</Link>
          <Link to="/cakes">Cakes</Link>
        </div>
      </div>
    </nav>
  );
}