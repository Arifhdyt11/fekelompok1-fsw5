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
import FormActionProduct from "pages/FormActionProduct";
import History from "pages/History";
import Middleware from "pages/Middleware";
import Unauthorized from "pages/401";
import Forbidden from "pages/403";
import PageNotFound from "pages/404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<DetailProduct />} />

        <Route
          path="/seller"
          element={<Middleware childern={<DaftarJual />} />}
        />
        <Route
          path="/seller-product/:id"
          element={<Middleware childern={<DetailProduct />} />}
        />
        <Route
          path="/add-product"
          element={<Middleware childern={<FormActionProduct isAdd="yes" />} />}
        />
        <Route
          path="/update-product/:id"
          element={<Middleware childern={<FormActionProduct />} />}
        />

        <Route
          path="/transaction/:id"
          element={<Middleware childern={<InfoPenawarPage />} />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/history" element={<History />} />
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
