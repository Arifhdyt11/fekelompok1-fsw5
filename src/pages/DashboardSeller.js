import React, { useEffect } from "react";

import "assets/css/dashboardSeller.css";

import Navbar from "components/Navbar";
import ProductHeader from "components/dashboardSeller/ProductHeader";
import ProductBody from "components/dashboardSeller/ProductBody";
import Footer from "components/Footer";
// import Button from "elements/Button";

function DaftarJual() {
  useEffect(() => {
    document.title = "Shoesnarian | Seller";
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <ProductHeader />
        <ProductBody />
      </div>
      <Footer />
    </>
  );
}

export default DaftarJual;
