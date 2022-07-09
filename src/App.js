import "assets/css/global.css";
import "assets/fontawesome/css/all.css";

import LandingPage from "pages/LandingPage";
import Register from "pages/Register";
import Login from "pages/Login";
import DaftarJual from "pages/DaftarJual";
import ProfilePage from "pages/Profile";
import DetailProduct from "pages/DetailProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionDetail from "./pages/TransactionDetail";
import Wishlist from "pages/Wishlist";
import FormActionProduct from "pages/FormActionProduct";
import History from "pages/History";
import Middleware from "pages/Middleware";
import Unauthorized from "pages/401";
import Forbidden from "pages/403";
import PageNotFound from "pages/404";
import Transaction from "pages/Transaction";

import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <GoogleOAuthProvider clientId="862620400274-70dbl8u153ks65c3rehml7qonmb2c2um.apps.googleusercontent.com">
              <Login />
            </GoogleOAuthProvider>
          }
        />

        <Route
          path="/register"
          element={
            <GoogleOAuthProvider clientId="862620400274-70dbl8u153ks65c3rehml7qonmb2c2um.apps.googleusercontent.com">
              <Register />
            </GoogleOAuthProvider>
          }
        />

        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<DetailProduct />} />

        <Route
          path="/seller"
          element={<Middleware role="SELLER" childern={<DaftarJual />} />}
        />
        <Route
          path="/seller-product/:id"
          element={<Middleware role="SELLER" childern={<DetailProduct />} />}
        />
        <Route
          path="/add-product"
          element={
            <Middleware
              role="SELLER"
              childern={<FormActionProduct isAdd="yes" />}
            />
          }
        />
        <Route
          path="/update-product/:id"
          element={
            <Middleware role="SELLER" childern={<FormActionProduct />} />
          }
        />

        <Route
          path="/transaction"
          element={<Middleware role="SELLER" childern={<Transaction />} />}
        />
        <Route
          path="/transaction/:id"
          element={
            <Middleware role="SELLER" childern={<TransactionDetail />} />
          }
        />
        <Route
          path="/profile"
          element={<Middleware role="BOTH" childern={<ProfilePage />} />}
        />
        <Route
          path="/wishlist"
          element={<Middleware role="BUYER" childern={<Wishlist />} />}
        />
        <Route path="/history" element={<History />} />

        <Route path="/401" element={<Unauthorized />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
