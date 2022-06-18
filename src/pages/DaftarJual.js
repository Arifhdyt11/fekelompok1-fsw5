import React, { useState } from "react";

import "assets/css/daftarJual.css";

import Navbar from "components/Navbar";
import ProductHeader from "components/daftar-jual/ProductHeader";
import ProductBody from "components/daftar-jual/ProductBody";
import Footer from "components/Footer";
import Button from "elements/Button";

import { getInitialData } from "json/data.js";

function DaftarJual() {
  // getdata
  const [product, setProduct] = useState(getInitialData());

  const menuItems = [...new Set(getInitialData().map((Val) => Val.status))];

  const filterItem = (curcat) => {
    const newItem = getInitialData().filter((newVal) => {
      return newVal.status === curcat;
    });
    setProduct(newItem);
  };

  return (
    <>
      <Navbar isSearch="yes" isLogin="yes" />
      <div className="container my-5">
        <ProductHeader />

        <div className="d-md-flex flex-row-reverse">
          <Button
            className="btn active my-4"
            hasShadow
            isPrimary
            href="/"
            type="link"
          >
            Tambah Produk
          </Button>
        </div>

        <ProductBody
          product={product}
          setProduct={setProduct}
          filterItem={filterItem}
          menuItems={menuItems}
        />
      </div>
      <Footer />
    </>
  );
}

export default DaftarJual;
