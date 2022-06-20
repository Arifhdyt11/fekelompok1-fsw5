import "assets/css/global.css";
import "assets/fontawesome/css/all.css";

import LandingPage from "pages/LandingPage";
import Register from "pages/Register";
import Login from "pages/Login";
import DaftarJual from "pages/DaftarJual";
import ProfilePage from "pages/Profile";
import DetailProduct from "pages/DetailProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InfoPenawarPage from "./pages/InfoPenawar";
import TambahProduk from "pages/Seller-TambahProduk";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={<LandingPage isLogin="yes" isSeller="yes" />}
        />
        <Route path="/product/:id" element={<DetailProduct isLogin="yes" />} />

        <Route path="/seller" element={<DaftarJual isLogin="yes" />} />
        <Route
          path="/seller-product/:id"
          element={<DetailProduct isLogin="yes" isSeller="yes" />}
        />

        <Route path="/profile" element={<ProfilePage isLogin="yes" />} />
        <Route
          path="/transaction/:id"
          element={<InfoPenawarPage isLogin="yes" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
