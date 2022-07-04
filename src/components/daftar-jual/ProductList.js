import { useSelector } from "react-redux";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListProductSeller } from "store/actions/productAction";

import ProductItem from "./ProductItem";
import img from "assets/images/ilustrasi.svg";

function ProductList() {
  const {
    getListProductSellerResult,
    getListProductSellerLoading,
    getListProductSellerError,
  } = useSelector((state) => state.ProductReducer);
  const { accessToken } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProductSeller(accessToken));
  }, [dispatch]);

  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="section-produk my-2 s">
        <div className="row justify-content-center">
          {getListProductSellerResult ? (
            getListProductSellerResult.data.length === 0 ? (
              <div className="d-flex justify-content-center null-illustration p-5">
                <div>
                  <img src={img} alt="" className="img-fluid mb-3" />
                  <p>Produk tidak ditemukan</p>
                </div>
              </div>
            ) : (
              getListProductSellerResult.data.map((item) => {
                return <ProductItem key={item.id} {...item} />;
              })
            )
          ) : getListProductSellerLoading ? (
            <h3>Loading....</h3>
          ) : (
            <p>
              {getListProductSellerError
                ? getListProductSellerError
                : "Data Kosong"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
