import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Cookies from "./pages/Cookies";
import Muffins from "./pages/MuffinsandLoafs";
import Cakes from "./pages/Cakes";
import Desserts from "./pages/Desserts";
import RecipeDetail from "./pages/RecipeDetail";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/muffins" element={<Muffins />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/desserts" element={<Desserts />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
