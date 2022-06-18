import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import infoPenawar from "../json/infoPenawar.json";
import ProdukInfoPenawar from "../components/info-penawar/ProdukInfoPenawar";
import BuyerInfoPenawar from "../components/info-penawar/BuyerInfoPenawar";

import { useParams } from "react-router-dom";
import { getInitialData } from "json/data.js";

export default function InfoPenawarPage() {
  const { id } = useParams();
  const dataProduct = getInitialData().find((prod) => prod.id === id);
  function CheckDiminati() {
    if (dataProduct.status != "Diminati") {
      return <h1>Kalo produk gada</h1>;
    } else {
      return (
        <>
          <BuyerInfoPenawar databuyer={infoPenawar.pembeli} />
          <ProdukInfoPenawar
            dataProduct={dataProduct}
            productbid={infoPenawar.pembeli}
          />
        </>
      );
    }
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <CheckDiminati />
      </div>
      <Footer />
    </div>
  );
}
