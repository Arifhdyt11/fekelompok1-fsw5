import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import infoPenawar from "../json/infoPenawar.json";
import ProdukInfoPenawar from "../components/info-penawar/ProdukInfoPenawar";
import BuyerInfoPenawar from "../components/info-penawar/BuyerInfoPenawar";

export default function InfoPenawarPage() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <BuyerInfoPenawar databuyer={infoPenawar.pembeli} />
        <ProdukInfoPenawar productbid={infoPenawar.pembeli} />
      </div>
      <Footer />
    </div>
  );
}
