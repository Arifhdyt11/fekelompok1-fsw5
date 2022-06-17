import "assets/css/style.css";
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

        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/seller" element={<DaftarJual />} />
        <Route path="/seller/daftar-jual" element={<DaftarJual />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/transaction" element={<InfoPenawarPage />} />
        <Route path="/seller/product/add" element={<TambahProduk />} />
        <Route
          path="/transaction"
          element={<InfoPenawarPage isLogin="yes" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
