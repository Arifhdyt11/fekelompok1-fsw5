import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getListTransactionSeller } from "store/actions/transactionAction";

import img from "assets/images/ilustrasi.svg";
import ProductItem from "./ProductItem";
import CardLoading from "components/CardLoading";
import _ from "lodash";

export default function Sold() {
  const { user } = useSelector((state) => state.AuthReducer);
  const {
    getListTransactionSellerResult,
    getListTransactionSellerLoading,
    getListTransactionSellerError,
  } = useSelector((state) => state.TransactionReducer);

  const [sold, setSold] = useState([]);

  if (user.data.role === "SELLER") {
    var initialSold = getListTransactionSellerResult.data;
  }

  useEffect(() => {
    if (user.data.role === "SELLER") {
      setSold(initialSold);
    }
  }, [initialSold]);

  if (sold) {
    var filteredSold = sold.filter((item) => item.status === "success");
  }

  const dataSold = filteredSold;
  const uniqueSold = _(dataSold)
    .groupBy("productSizes.products.id")
    .map((items) => ({
      count: items.length,
      ...items[0],
    }))
    .value();

  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="section-produk my-2 s">
        <div className="row justify-content-start">
          {getListTransactionSellerResult ? (
            uniqueSold ? (
              uniqueSold.length === 0 ? (
                <div className="d-flex justify-content-center null-illustration p-5">
                  <div>
                    <img src={img} alt="" className="img-fluid mb-3" />
                    <p>Produk tidak ditemukan</p>
                  </div>
                </div>
              ) : (
                uniqueSold.map((item, index) => {
                  return <ProductItem key={item.id} {...item} index={index} />;
                })
              )
            ) : (
              <div className="d-flex justify-content-center null-illustration p-5">
                <div>
                  <img src={img} alt="" className="img-fluid mb-3" />
                  <p>Produk tidak ditemukan</p>
                </div>
              </div>
            )
          ) : getListTransactionSellerLoading ? (
            <CardLoading col="3" count="3" />
          ) : (
            <p>
              {getListTransactionSellerError
                ? getListTransactionSellerError
                : "Please Reload and Try Again"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
