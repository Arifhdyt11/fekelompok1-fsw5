import "assets/css/global.css";
import "assets/fontawesome/css/all.css";

import LandingPage from "pages/LandingPage";
import Register from "pages/Register";
import Login from "pages/Login";
import DashboardSeller from "pages/DashboardSeller";
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
import NotificationPages from "pages/NotificationPages";

import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_CLIENT_ID}`}
            >
              <Login />
            </GoogleOAuthProvider>
          }
        />

        <Route
          path="/register"
          element={
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_CLIENT_ID}`}
            >
              <Register />
            </GoogleOAuthProvider>
          }
        />

        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<DetailProduct />} />

        <Route
          path="/seller"
          element={<Middleware role="SELLER" childern={<DashboardSeller />} />}
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
        <Route
          path="/history"
          element={<Middleware role="BOTH" childern={<History />} />}
        />

        <Route
          path="/notifications"
          element={<Middleware role="BOTH" childern={<NotificationPages />} />}
        />

        <Route path="/401" element={<Unauthorized />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/seller-product/*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
