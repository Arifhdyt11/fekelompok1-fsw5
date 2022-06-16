import "./assets/css/style.css";

import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DaftarJual from "./pages/DaftarJual";
import DetailProduct from "./pages/DetailProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/seller" element={<DaftarJual />} />
        <Route
          path="/seller/product/:id"
          element={<DetailProduct isSeller="yes" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
