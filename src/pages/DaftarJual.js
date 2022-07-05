import React from "react";

import "assets/css/daftarJual.css";

import Navbar from "components/Navbar";
import ProductHeader from "components/daftar-jual/ProductHeader";
import ProductBody from "components/daftar-jual/ProductBody";
import Footer from "components/Footer";
// import Button from "elements/Button";

function DaftarJual() {
  return (
    <>
      <Navbar isSearch="yes" isLogin="yes" />
      <div className="container my-5">
        <ProductHeader />
        <ProductBody />
      </div>
      <Footer />
    </>
  );
}

export default DaftarJual;
