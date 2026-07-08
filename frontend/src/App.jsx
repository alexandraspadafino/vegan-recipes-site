import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Cookies from "./pages/Cookies";
import Muffins from "./pages/Muffins";
import Cakes from "./pages/Cakes";
import RecipeDetail from "./pages/RecipeDetail";
import Order from "./pages/Order";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/muffins" element={<Muffins />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:recipeId" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
