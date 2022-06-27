import { useSelector } from "react-redux";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListProduct } from "store/actions/productAction";

import ProductItem from "./ProductItem";
import img from "assets/images/ilustrasi.svg";

function ProductList({ product }) {
  const { getListProductResult, getListProductLoading, getListProductError } =
    useSelector((state) => state.ProductReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct());
  }, [dispatch]);

  const userId = 1; //Ngambil data userId berdasarkan login
  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="section-produk my-2 s">
        <div className="row justify-content-center">
          {getListProductResult ? (
            getListProductResult.data.filter((item) => item.userId === userId)
              .length === 0 ? (
              <div className="d-flex justify-content-center null-illustration p-5">
                <div>
                  <img src={img} alt="" className="img-fluid mb-3" />
                  <p>Produk tidak ditemukan</p>
                </div>
              </div>
            ) : (
              getListProductResult.data
                .filter((item) => item.userId === userId)
                .map((item) => {
                  return <ProductItem key={item.id} {...item} />;
                })
            )
          ) : getListProductLoading ? (
            <h3>Loading....</h3>
          ) : (
            <p>{getListProductError ? getListProductError : "Data Kosong"}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
