import "assets/css/detailProduct.css";

import { Navigate, useParams } from "react-router-dom";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductId, getProductIdSeller } from "store/actions/productAction";

import ActionDetail from "components/detailProduct/ActionDetail";
import DescriptionProduct from "components/detailProduct/DescriptionProduct";
import Footer from "components/Footer";
import Galery from "components/detailProduct/Galery";
import Navbar from "components/Navbar";
import ProductTitle from "components/detailProduct/ProductTitle";
import PageNotFound from "./404";

function ShowDetailProduct() {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <ProductTitle />
      <Galery productId={id} />
      <section className="container section-detail-product mt-5 mb-5">
        <div className="row">
          <div className="col-lg-5 order-sm-5 mb-5 mb-lg-0 d-flex align-items-center">
            <ActionDetail id={id} />
          </div>
          <div className="col-lg-7 order-sm-1 ">
            <DescriptionProduct />
          </div>
        </div>
      </section>
    </>
  );
}

export default function DetailProduct() {
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.AuthReducer
  );
  const {
    getProductIdResult,

    getProductSellerIdResult,
  } = useSelector((state) => state.ProductReducer);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Shoesnarian | Detail Product";
  });

  useEffect(() => {
    dispatch(getProductId(id));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user.data.role === "SELLER") {
        dispatch(getProductIdSeller(id, accessToken));
      }
    }
  }, [dispatch]);

  return (
    <>
      {isAuthenticated ? (
        user.data.role === "SELLER" ? (
          getProductSellerIdResult ? (
            <ShowDetailProduct />
          ) : (
            <ShowDetailProduct />
          )
        ) : getProductIdResult ? (
          getProductIdResult.status === "published" ? (
            <ShowDetailProduct />
          ) : (
            <Navigate to={`/404`} />
          )
        ) : (
          <ShowDetailProduct />
        )
      ) : getProductIdResult ? (
        getProductIdResult.status === "published" ? (
          <ShowDetailProduct />
        ) : (
          <Navigate to={`/404`} />
        )
      ) : (
        <ShowDetailProduct />
      )}
    </>
  );
}
