import "assets/css/landingPage.css";
import React, { useState } from "react";

import Navbar from "components/Navbar";
import Hero from "components/Hero";
import Product from "components/Product";
import Footer from "components/Footer";

import { getInitialData } from "json/data.js";
import { getKategoriData } from "json/kategori-produk";

export default function LandingPage(props) {
  const { isLogin, isSeller } = props;

  // getdata
  const [product, setProduct] = useState(getInitialData());
  const [kategori] = useState(getKategoriData());

  const menuItems = [...new Set(getKategoriData().map((Val) => Val.category))];

  const filterItem = (curcat) => {
    const newItem = getInitialData().filter((newVal) => {
      return newVal.category === curcat;
    });
    setProduct(newItem);
  };

  return (
    <>
      <Navbar isSearch="yes" isLogin={isLogin} isSeller={isSeller}></Navbar>
      <Hero></Hero>
      <Product
        data={product}
        setProduct={setProduct}
        kategori={kategori}
        filterItem={filterItem}
        menuItems={menuItems}
      ></Product>
      <Footer></Footer>
    </>
  );
}
