import "assets/css/detailProduct.css";

import { useParams } from "react-router-dom";

import ActionDetail from "components/ActionDetail";
import DescriptionProduct from "components/DescriptionProduct";
import Footer from "components/Footer";
import Galery from "components/Galery";
import Navbar from "components/Navbar";
import ProductTitle from "components/ProductTitle";

import { getInitialData } from "json/data.js";

export default function DetailProduct(props) {
  const { isSeller, isLogin } = props;

  const { id } = useParams();
  const dataProduct = getInitialData().find((prod) => prod.id === id);

  return (
    <>
      <Navbar isLogin={isLogin} isSeller="yes" />
      <ProductTitle dataProduct={dataProduct} />
      <Galery dataProduct={dataProduct} />
      <section className="container section-detail-product mt-5 mb-5">
        <div className="row">
          <div className="col-lg-5 order-sm-5 mb-5 mb-lg-0 d-flex align-items-center">
            <ActionDetail isSeller={isSeller} />
          </div>
          <div className="col-lg-7 order-sm-1 ">
            <DescriptionProduct dataProduct={dataProduct} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
