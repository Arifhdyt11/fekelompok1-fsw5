import "assets/css/detailProduct.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "components/Navbar";
import ProductTitle from "components/detailProduct/ProductTitle";
import Galery from "components/detailProduct/Galery";
import DescriptionProduct from "components/detailProduct/DescriptionProduct";
import ActionDetail from "components/detailProduct/ActionDetail";

import { getProductId, getProductIdSeller } from "store/actions/productAction";
import { getListSize } from "store/actions/sizeAction";
import { getListTransactionBuyer } from "store/actions/transactionAction";
import { io } from "socket.io-client";

function ShowDetailProduct() {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <ProductTitle />
      <Galery productId={id} />
      <section className="container section-detail-product mt-5 mb-5">
        <div className="row">
          <div className="col-lg-5 order-md-5 mb-5 mb-lg-0 d-flex align-items-center">
            <ActionDetail id={id} />
          </div>
          <div className="col-lg-7 order-md-1 ">
            <DescriptionProduct />
          </div>
        </div>
      </section>
    </>
  );
}

export default function DetailProduct() {
  useEffect(() => {
    document.title = "Shoesnarian | Detail Product";
  });

  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
  const { getProductIdResult, getProductSellerIdResult } = useSelector(
    (state) => state.ProductReducer
  );

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (user.data.role === "SELLER") {
        dispatch(getProductIdSeller(id));
      } else {
        dispatch(getProductId(id));
      }
    } else {
      dispatch(getProductId(id));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getListSize());
  }, [dispatch]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET);

    socket.on("connection", () => {
      if (isAuthenticated) {
        if (user.data.role === "BUYER") {
          socket.on("update-transaction", () => {
            dispatch(getListTransactionBuyer());
          });
        }
      }
      socket.on("add-products", () => {
        dispatch(getProductId(id));
      });
      socket.on("update-products", () => {
        dispatch(getProductId(id));
      });
      socket.on("delete-products", () => {
        dispatch(getProductId(id));
      });
    });
  }, [getProductId, getListTransactionBuyer]);

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
          <ShowDetailProduct />
        ) : (
          <ShowDetailProduct />
        )
      ) : (
        <ShowDetailProduct />
      )}
    </>
  );
}
