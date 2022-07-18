import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import _ from "lodash";

import Button from "elements/Button";
import ProductNotFound from "assets/images/ilustrasi.svg";
import { formatPrice, titleShorten } from "utils/defaultFormat";

import { getListProduct } from "store/actions/productAction";
import { getListCategory } from "store/actions/categoryAction";
import { GET_PRODUCT_ID } from "store/types";

import { io } from "socket.io-client";
import CardLoading from "components/CardLoading";

export default function Product(props) {
  //--------------------GET PRODUCT AND SET PRODUCT--------------------
  const dispatch = useDispatch();
  const {
    getListProductResult,
    getListProductLoading,
    getListProductError,
    getProductIdResult,
  } = useSelector((state) => state.ProductReducer);

  const getInitialData = getListProductResult.data;

  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(dispatch(getListProduct()));
  }, [dispatch]);

  useEffect(() => {
    setProduct(getInitialData);
  }, [getInitialData]);

  // console.log(product);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET);

    socket.on("connection", () => {
      // console.log("connct");
      socket.on("add-products", (message) => {
        console.log(message);
        dispatch(getListProduct());
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
  }, [getListProduct]);

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

  useEffect(() => {
    if (getProductIdResult) {
      dispatch({
        type: GET_PRODUCT_ID,
        payload: {
          loading: true,
          data: false,
          errorMessage: false,
        },
      });
    }
  });

  return (
    <>
      <section className="container mt-2 mb-5" ref={props.refCallToAction}>
        <div className="category mb-5">
          <h3>Kategori</h3>
          <div className="row justify-content-between">
            <div className="col-lg-8 col-md-12 col-sm-12 mb-4 mb-lg-0">
              <Button
                className={`btn btn-filter me-3 my-2 ${
                  active === "All" && "btn-active"
                }`}
                hasShadow
                isSecondaryOutline
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
                      isSecondaryOutline
                      key={index}
                      onClick={() => filterCategory(kategori.name)}
                    >
                      {kategori.name}
                    </Button>
                  );
                })
              ) : getListCategoryLoading ? (
                <Button isLoading></Button>
              ) : (
                <p>
                  {getListCategoryError
                    ? getListCategoryError
                    : "Please Reload or Try Again"}
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
              product.filter((item) => item.status === "published").length ===
              0 ? (
                <div className="text-center null-illustration p-5">
                  <img
                    src={ProductNotFound}
                    alt=""
                    className="img-fluid mb-3"
                  />
                  <p>Produk tidak ditemukan</p>
                </div>
              ) : (
                product
                  .filter((item) => item.status === "published")
                  .sort(
                    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
                  )
                  .map((item, index) => {
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
                              <h5 style={{ height: 45 }}>
                                {titleShorten(item.name, 40, " ")}
                              </h5>
                            </div>
                            <p>{item.categories.name}</p>
                            <h5>Rp. {formatPrice(item.price)}</h5>
                          </div>
                        </Fade>
                      </Button>
                    );
                  })
              )
            ) : getListProductLoading ? (
              <>
                <CardLoading col="4" count="8" />
              </>
            ) : (
              <p>
                {getListProductError
                  ? getListProductError
                  : "Please Reload or Try Again"}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
