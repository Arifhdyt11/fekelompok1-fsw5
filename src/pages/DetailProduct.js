import "assets/css/detailProduct.css";

import { useParams } from "react-router-dom";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductId } from "store/actions/productAction";

import ActionDetail from "components/ActionDetail";
import DescriptionProduct from "components/DescriptionProduct";
import Footer from "components/Footer";
import Galery from "components/Galery";
import Navbar from "components/Navbar";
import ProductTitle from "components/ProductTitle";

export default function DetailProduct(props) {
  const { isSeller, isLogin } = props;

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductId(id));
  }, [dispatch]);

  return (
    <>
      <Navbar isLogin={isLogin} isSeller="yes" />
      <ProductTitle />
      <Galery />
      <section className="container section-detail-product mt-5 mb-5">
        <div className="row">
          <div className="col-lg-5 order-sm-5 mb-5 mb-lg-0 d-flex align-items-center">
            <ActionDetail isSeller={isSeller} id={id} />
          </div>
          <div className="col-lg-7 order-sm-1 ">
            <DescriptionProduct />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
