import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProduct } from "store/actions/productAction";

import _ from "lodash";

import Button from "elements/Button";
import ProductNotFound from "assets/images/ilustrasi.svg";

import { formatPrice, titleShorten } from "utils/defaultFormat";

import { getListCategory } from "store/actions/categoryAction";
import Fade from "react-reveal/Fade";

export default function Product(props) {
  //--------------------GET PRODUCT AND SET PRODUCT--------------------
  const dispatch = useDispatch();
  const { getListProductResult, getListProductLoading, getListProductError } =
    useSelector((state) => state.ProductReducer);

  const getInitialData = getListProductResult.data;

  const [product, setProduct] = useState(getInitialData);
  useEffect(() => {
    setProduct(dispatch(getListProduct()));
  }, [dispatch]);

  useEffect(() => {
    setProduct(getInitialData);
  }, [getInitialData]);

  //-----------------------SEARCH ---------------------
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchFilter = (e) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const filter = _.filter(getListProductResult.data, (x) => {
        return _.includes(
          _.lowerCase(JSON.stringify(_.values(x))),
          _.lowerCase(searchValue)
        );
      });
      setProduct(filter);
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  //-----------------------GET & FILTER CATEGORY---------------------
  const [active, setActive] = useState("All");
  const {
    getListCategoryResult,
    getListCategoryLoading,
    getListCategoryError,
  } = useSelector((state) => state.CategoryReducer);

  useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch]);

  const filterCategory = (kategori) => {
    if (kategori === "All") {
      setProduct(getInitialData);
      setActive(kategori);
    } else {
      const newItem = getInitialData.filter((item) => {
        return item.categories.name === kategori;
      });
      setProduct(newItem);
    }
    setActive(kategori);
  };

  return (
    <>
      <section
        className="container section-product mt-2 mb-5"
        ref={props.refCallToAction}
      >
        <div className="filter mb-5">
          <h3>Kategori</h3>
          <div className="row justify-content-between">
            <div className="col-lg-7 col-md-12 col-sm-12 mb-4 mb-lg-0">
              <Button
                className={`btn btn-filter me-3 my-2 ${
                  active === "All" && "btn-active"
                }`}
                hasShadow
                isSecondary
                onClick={() => filterCategory("All")}
              >
                All
              </Button>

              {getListCategoryResult ? (
                getListCategoryResult.data.map((kategori, index) => {
                  return (
                    <Button
                      className={`btn btn-filter me-3 my-2 ${
                        active == kategori.name && "btn-active"
                      }`}
                      hasShadow
                      isSecondary
                      key={index}
                      onClick={() => filterCategory(kategori.name)}
                    >
                      {kategori.name}
                    </Button>
                  );
                })
              ) : getListCategoryLoading ? (
                <h3>Loading....</h3>
              ) : (
                <p>
                  {getListCategoryError ? getListCategoryError : "Data Kosong"}
                </p>
              )}
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 align-self-center">
              <input
                className="form-control search-form me-2"
                type="search"
                placeholder="Search product..."
                value={searchValue}
                onChange={handleSearchFilter}
              />
            </div>
          </div>
        </div>

        <div className="product">
          <div className="row justify-content-start">
            {product ? (
              product.length === 0 ? (
                <div className="d-flex justify-content-center null-illustration p-5">
                  <div>
                    <img
                      src={ProductNotFound}
                      alt=""
                      className="img-fluid mb-3"
                    />
                    <p>Produk tidak ditemukan</p>
                  </div>
                </div>
              ) : (
                product.map((item, index) => {
                  return (
                    <Button
                      type="link"
                      href={`/product/${item.id}`}
                      className="col-lg-3 col-md-6 col-sm-12  "
                      style={{ textDecoration: "none" }}
                      key={item.id}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <Fade bottom delay={150 * index}>
                        <div className="card-product p-3 mb-4">
                          <img
                            src={`${item.image[0]}`}
                            alt={`${item.image[0]}`}
                            className="img-fluid product-img mb-4"
                          />
                          <div className="product-name mb-1">
                            <h4 style={{ height: 45 }}>
                              {titleShorten(item.name, 50, " ")}
                            </h4>
                          </div>
                          <p>{item.categories.name}</p>
                          <h4>Rp. {formatPrice(item.price)}</h4>
                        </div>
                      </Fade>
                    </Button>
                  );
                })
              )
            ) : getListProductLoading ? (
              <h3>Loading....</h3>
            ) : (
              <p>{getListProductError ? getListProductError : "Data Kosong"}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
