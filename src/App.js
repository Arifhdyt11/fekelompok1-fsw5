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
import Wishlist from "pages/Wishlist";
import AddProduct from "pages/Seller-TambahProduk";
import History from "pages/History";

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
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/seller" element={<DaftarJual isLogin="yes" />} />
        <Route
          path="/seller-product/:id"
          element={<DetailProduct isLogin="yes" isSeller="yes" />}
        />
        <Route path="/add-product" element={<AddProduct isLogin="yes" />} />
        <Route path="/profile" element={<ProfilePage isLogin="yes" />} />
        <Route
          path="/transaction/:id"
          element={<InfoPenawarPage isLogin="yes" />}
        />
        <Route path="/profile" element={<ProfilePage isLogin="yes" />} />
        <Route path="/wishlist" element={<Wishlist isLogin="yes" />} />
        <Route path="/history" element={<History isLogin="yes" />} />
      </Routes>
    </Router>
  );
}

export default App;
