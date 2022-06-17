import "assets/css/style.css";
import "assets/fontawesome/css/all.css";

import LandingPage from "pages/LandingPage";
import Register from "pages/Register";
import Login from "pages/Login";
import DaftarJual from "pages/DaftarJual";
import ProfilePage from "pages/Profile";
import DetailProduct from "pages/DetailProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InfoPenawarPage from "pages/InfoPenawar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<DetailProduct isLogin="yes" />} />

        <Route path="/seller" element={<DaftarJual isLogin="yes" />} />
        <Route path="/seller/product/:id" element={<DetailProduct />} />

        <Route path="/profile" element={<ProfilePage isLogin="yes" />} />
        <Route
          path="/transaction"
          element={<InfoPenawarPage isLogin="yes" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
