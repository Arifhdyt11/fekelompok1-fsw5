import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import Button from "elements/Button";
import Shadow from "assets/images/shadow-img.png";
import Pad from "assets/images/cover-img.png";

export default function Galery({ productId }) {
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
  const {
    getProductIdResult,
    getProductIdLoading,
    getProductIdError,

    getProductIdSellerResult,
    getProductIdSellerLoading,
    getProductIdSellerError,
  } = useSelector((state) => state.ProductReducer);

  const { getListSizeResult, getListSizeLoading, getListSizeError } =
    useSelector((state) => state.SizeReducer);

  const location = useLocation();

  //--------------------------Choose Size---------------
  const [active, setActive] = useState("");

  const chooseSize = (size) => {
    setActive(size);
    window.scrollTo(0, 300);
  };
  return (
    <>
      <section className="container section-galery-product">
        <div className="row justify-content-between ">
          <div className="col-lg-7 col-sm-12 px-4">
            <div className="img-product-big mb-4 text-center">
              <img
                src={
                  isAuthenticated ? (
                    user.data.role === "SELLER" ? (
                      getProductIdSellerResult ? ( //SELLER
                        `${getProductIdSellerResult.image[0]}`
                      ) : getProductIdSellerLoading ? (
                        <Button isLoading></Button>
                      ) : (
                        <p>
                          {getProductIdSellerError
                            ? getProductIdSellerError
                            : ""}
                        </p>
                      )
                    ) : getProductIdResult ? ( //BUYER
                      `${getProductIdResult.image[0]}`
                    ) : getProductIdLoading ? (
                      <Button isLoading></Button>
                    ) : (
                      <p>{getProductIdError ? getProductIdError : ""}</p>
                    )
                  ) : getProductIdResult ? ( //NOT LOGGED IN
                    `${getProductIdResult.image[0]}`
                  ) : getProductIdLoading ? (
                    <Button isLoading></Button>
                  ) : (
                    <p>{getProductIdError ? getProductIdError : ""}</p>
                  )
                }
                alt=""
                className="default-image shoes mb-n3"
              />
              <img src={Shadow} alt="Shadow" className="shadow-image mb-n5 " />
              <img src={Pad} alt="Pad" className="pad-image mb-3 " />
            </div>
          </div>
          <div className="col-lg-5 col-sm-12 px-0 align-self-center text-center">
            <OwlCarousel
              className="mb-1"
              stagePadding={"0"}
              merge={true}
              loop={true}
              autoplay={true}
              autoplayTimeout={"2000"}
              responsive={{
                0: {
                  items: 1,
                },
                540: {
                  items: 1,
                },
                960: {
                  items: 2,
                },
                1140: {
                  items: 2,
                },
              }}
            >
              {isAuthenticated ? (
                user.data.role === "SELLER" ? (
                  getProductIdSellerResult ? (
                    getProductIdSellerResult.image.map((item, index) => {
                      return (
                        <div className="card-thumb" key={index}>
                          <Button hasShadow className="thumb-img">
                            <img
                              className=" img-fluid"
                              src={`${item}`}
                              alt=""
                            />
                          </Button>
                        </div>
                      );
                    })
                  ) : getProductIdSellerLoading ? (
                    <Button isLoading></Button>
                  ) : (
                    <p>
                      {getProductIdSellerError ? getProductIdSellerError : ""}
                    </p>
                  )
                ) : getProductIdResult ? ( //BUYER
                  getProductIdResult.image.map((item, index) => {
                    return (
                      <div className="card-thumb" key={index}>
                        <Button hasShadow className="thumb-img">
                          <img className=" img-fluid" src={`${item}`} alt="" />
                        </Button>
                      </div>
                    );
                  })
                ) : getProductIdLoading ? (
                  <Button isLoading></Button>
                ) : (
                  <p>{getProductIdError ? getProductIdError : ""}</p>
                )
              ) : getProductIdResult ? ( //NOT LOGGED IN
                getProductIdResult.image.map((item, index) => {
                  return (
                    <div className="card-thumb" key={index}>
                      <Button hasShadow className="thumb-img">
                        <img className=" img-fluid" src={`${item}`} alt="" />
                      </Button>
                    </div>
                  );
                })
              ) : getProductIdLoading ? (
                <Button isLoading></Button>
              ) : (
                <p>{getProductIdError ? getProductIdError : ""}</p>
              )}
            </OwlCarousel>

            <div className="size mt-4">
              <h3>Size Ready</h3>
              <div className="size-ready justify-content-center">
                {getListSizeResult ? (
                  getListSizeResult.data.filter(
                    (item) =>
                      item.productId === parseInt(productId) && item.stock > 0
                  ).length === 0 ? (
                    <div
                      class="alert alert-danger mt-4 mx-2"
                      role="alert"
                      style={{ cursor: "context-menu" }}
                    >
                      {isAuthenticated
                        ? user.data.role === "SELLER"
                          ? "Silahkan Tambahkan Stock"
                          : "Mohon Maaf Product Tidak Tersedia"
                        : "Mohon Maaf Product Tidak Tersedia"}
                    </div>
                  ) : isAuthenticated ? (
                    user.data.role === "SELLER" ? (
                      getListSizeResult.data
                        .filter(
                          (item) =>
                            item.productId === parseInt(productId) &&
                            item.stock !== 0
                        )
                        .sort((a, b) => a.sizes.id - b.sizes.id)
                        .map((item, index) => {
                          return (
                            <>
                              <Button
                                className={`btn  mx-2 my-2 `}
                                isSecondary
                                isDisabled
                                key={index}
                              >
                                {item.sizes.size}
                              </Button>
                            </>
                          );
                        })
                    ) : getListSizeResult.data.filter(
                        (item) =>
                          item.productId === parseInt(productId) &&
                          item.products.status === "draft"
                      ).length > 0 ? (
                      <Button
                        className="btn btn-warning mt-3 py-2 mx-0"
                        style={{ cursor: "context-menu" }}
                      >
                        Product Tidak Tersedia Untuk Sementara
                      </Button>
                    ) : (
                      getListSizeResult.data
                        .filter(
                          (item) =>
                            item.productId === parseInt(productId) &&
                            item.stock !== 0
                        )
                        .sort((a, b) => a.sizes.id - b.sizes.id)
                        .map((item, index) => {
                          return (
                            <>
                              <Link
                                key={index}
                                to={`/product/${productId}`}
                                state={{
                                  item: { ...item },
                                }}
                              >
                                <Button
                                  className={`btn btn-filter mx-2 my-2 ${
                                    active == item.sizeId && "btn-active"
                                  }`}
                                  isSecondaryOutline
                                  onClick={() => chooseSize(item.sizeId)}
                                >
                                  {item.sizes.size}
                                </Button>
                              </Link>
                            </>
                          );
                        })
                    )
                  ) : getListSizeResult.data.filter(
                      (item) =>
                        item.productId === parseInt(productId) &&
                        item.products.status === "draft"
                    ).length > 0 ? (
                    <Button
                      className="btn btn-warning mt-3 py-2 mx-0"
                      style={{ cursor: "context-menu" }}
                    >
                      Product Tidak Tersedia Untuk Sementara
                    </Button>
                  ) : (
                    getListSizeResult.data
                      .filter(
                        (item) =>
                          item.productId === parseInt(productId) &&
                          item.stock !== 0
                      )
                      .sort((a, b) => a.sizes.id - b.sizes.id)
                      .map((item, index) => {
                        return (
                          <>
                            <Link
                              key={index}
                              to={`/product/${productId}`}
                              state={{
                                item: { ...item },
                              }}
                            >
                              <Button
                                className={`btn btn-filter mx-2 my-2 ${
                                  active == item.sizeId && "btn-active"
                                }`}
                                isSecondaryOutline
                                onClick={() => chooseSize(item.sizeId)}
                              >
                                {item.sizes.size}
                              </Button>
                            </Link>
                          </>
                        );
                      })
                  )
                ) : getListSizeLoading ? (
                  <Button isLoading></Button>
                ) : (
                  <p>{getListSizeError ? getListSizeError : "erro"}</p>
                )}
              </div>

              {/* STOCK */}
              <div className="mt-3">
                {getListSizeResult ? (
                  getListSizeResult.data.filter(
                    (item) =>
                      item.productId === parseInt(productId) && item.stock > 0
                  ).length === 0 ? (
                    ""
                  ) : isAuthenticated ? (
                    user.data.role === "SELLER" ? (
                      ""
                    ) : location.state ? (
                      <h5>Stock : {location.state.item.stock}</h5>
                    ) : (
                      ""
                    )
                  ) : location.state ? (
                    <h5>Stock : {location.state.item.stock}</h5>
                  ) : (
                    ""
                  )
                ) : getListSizeLoading ? (
                  <Button isLoading></Button>
                ) : (
                  <p>{getListSizeError ? getListSizeError : ""}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
