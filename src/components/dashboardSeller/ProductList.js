import { useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getListProductSeller } from "store/actions/productAction";

import ProductItem from "./ProductItem";
import img from "assets/images/ilustrasi.svg";
import Button from "elements/Button";
import _ from "lodash";
import CardLoading from "components/CardLoading";

function ProductList() {
  const {
    getListProductSellerResult,
    getListProductSellerLoading,
    getListProductSellerError,
  } = useSelector((state) => state.ProductReducer);
  const { user } = useSelector((state) => state.AuthReducer);

  //-----------------------SEARCH ---------------------

  const initialData = getListProductSellerResult.data;
  const [productSeller, setProductSeller] = useState(initialData);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setProductSeller(initialData);
  }, [initialData]);

  const handleSearchFilter = (e) => {
    setSearchValue(e.target.value);
  };
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const filter = _.filter(initialData, (x) => {
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

  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="row justify-content-between mb-4 mt-2">
        <div className="col-lg-7 col-md-6 col-sm-12 mb-3 mb-md-0">
          {user.data.name === null ||
          user.data.city === null ||
          user.data.phone === null ? (
            ""
          ) : (
            <Button
              className="btn"
              hasShadow
              isPrimary
              href="/add-product"
              type="link"
            >
              Tambah Produk
            </Button>
          )}
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
        <div className="row justify-content-start">
          {getListProductSellerLoading ? (
            <CardLoading col="3" count="3" />
          ) : productSeller ? (
            productSeller.filter((item) => item.status === "published")
              .length === 0 ? (
              <div className="d-flex justify-content-center null-illustration p-5">
                <div>
                  <img src={img} alt="" className="img-fluid mb-3" />
                  <p>Produk tidak ditemukan</p>
                </div>
              </div>
            ) : (
              productSeller
                .filter((item) => item.status === "published")
                .sort(
                  (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
                )
                .map((item, index) => {
                  return <ProductItem key={item.id} {...item} index={index} />;
                })
            )
          ) : (
            <p>{getListProductSellerError ? getListProductSellerError : ""}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
