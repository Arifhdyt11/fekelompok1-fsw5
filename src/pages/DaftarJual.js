import React, { useState } from "react";
import "../assets/css/daftarJual.css";
import Navbar from "./components/Navbar";
import ProductHeader from "./components/daftar-jual/ProductHeader";
import ProductBody from "./components/daftar-jual/ProductBody";
import Footer from "./components/Footer";

import { getInitialData } from "../json/data.js";

function DaftarJual() {

    // getdata
    const [product, setProduct] = useState(getInitialData());

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <ProductHeader />
                <ProductBody product={product} setProduct={setProduct} />
            </div>
            <Footer />
        </>
    );
}

export default DaftarJual;