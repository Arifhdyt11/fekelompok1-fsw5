import { useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getListProductSeller } from "store/actions/productAction";

import ProductItem from "./ProductItem";
import img from "assets/images/ilustrasi.svg";
import Button from "elements/Button";
import _ from "lodash";

function ProductList() {
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

  // console.log(productSeller);

  const handleSearchFilter = (e) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const filter = _.filter(getListProductSellerResult.data, (x) => {
        return _.includes(
          _.lowerCase(JSON.stringify(_.values(x))),
          _.lowerCase(searchValue)
        );
      });
      setProductSeller(filter);
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchValue]);
  //-----------------------SEARCH ---------------------
  console.log(productSeller);
  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="row justify-content-between mb-4 mt-2">
        <div className="col-lg-7 col-md-6 col-sm-12 mb-3 mb-md-0">
          <Button
            className="btn active"
            hasShadow
            isPrimary
            href="/add-product"
            type="link"
          >
            Tambah Produk
          </Button>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 align-self-center">
          <input
            className="form-control search-form me-2"
            type="search"
            placeholder="Search product..."
            value={searchValue}
            onChange={handleSearchFilter}
          />
        </div>
      </div>

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
              productSeller.map((item, index) => {
                return <ProductItem key={item.id} {...item} index={index} />;
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
