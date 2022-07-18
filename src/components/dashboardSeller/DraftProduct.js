import { useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getListProductSeller } from "store/actions/productAction";

import ProductItem from "./ProductItem";
import img from "assets/images/ilustrasi.svg";
import Button from "elements/Button";
import _ from "lodash";
import CardLoading from "components/CardLoading";

function DraftProduct() {
  const {
    getListProductSellerResult,
    getListProductSellerLoading,
    getListProductSellerError,
  } = useSelector((state) => state.ProductReducer);
  const { accessToken } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  //-----------------------SEARCH ---------------------
  const getInitialData = getListProductSellerResult.data;
  const [productSeller, setProductSeller] = useState(getInitialData);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setProductSeller(dispatch(getListProductSeller(accessToken)));
  }, [dispatch]);

  useEffect(() => {
    setProductSeller(getInitialData);
  }, [getInitialData]);

  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="section-produk my-2 s">
        <div className="row justify-content-center">
          {getListProductSellerResult ? (
            getListProductSellerResult.data.filter(
              (item) => item.status === "draft"
            ).length === 0 ? (
              <div className="d-flex justify-content-center null-illustration p-5">
                <div>
                  <img src={img} alt="" className="img-fluid mb-3" />
                  <p>Produk tidak ditemukan</p>
                </div>
              </div>
            ) : (
              getListProductSellerResult.data
                .filter((item) => item.status === "draft")
                .map((item, index) => {
                  return <ProductItem key={item.id} {...item} index={index} />;
                })
            )
          ) : getListProductSellerLoading ? (
            <CardLoading col="3" count="3" />
          ) : (
            <p>
              {getListProductSellerError
                ? getListProductSellerError
                : "Please Reload and Try Again"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DraftProduct;
