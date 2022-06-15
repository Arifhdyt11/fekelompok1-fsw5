import "./assets/css/style.css";

import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import InfoProdukPage from "./pages/InfoProdukPage";
import InfoPenawarPage from "./pages/InfoPenawarPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/seller/product" element={<InfoProdukPage />} />
        <Route path="/transaction" element={<InfoPenawarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
