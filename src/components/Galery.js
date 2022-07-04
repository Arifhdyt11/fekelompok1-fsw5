import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import Button from "elements/Button";
import Shadow from "assets/images/shadow-img.png";
import Pad from "assets/images/cover-img.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { getListSize } from "store/actions/sizeAction";

export default function Galery() {
  const { user } = useSelector((state) => state.AuthReducer);
  const { getProductIdResult, getProductIdSellerResult } = useSelector(
    (state) => state.ProductReducer
  );
  const { getListSizeResult, getListSizeLoading, getListSizeError } =
    useSelector((state) => state.SizeReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListSize());
  }, [dispatch]);
  const role = user.data.role;
  return (
    <>
      <section className="container section-galery-product">
        <div className="row justify-content-between mx-lg-5">
          <div className="col-lg-5 col-sm-12 px-4">
            <div className="img-product-big mb-4 text-center">
              <img
                src={
                  role === "SELLER"
                    ? getProductIdSellerResult //SELLER
                      ? `../images/${getProductIdSellerResult.image[0]}`
                      : ""
                    : getProductIdResult //BUYER
                    ? `../images/${getProductIdResult.image[0]}`
                    : ""
                }
                alt={
                  role === "SELLER"
                    ? getProductIdSellerResult
                      ? getProductIdSellerResult.name
                      : ""
                    : getProductIdResult.name
                }
                className="default-image shoes mb-n3"
              />
              <img src={Shadow} alt="Shadow" className="shadow-image mb-n5 " />
              <img src={Pad} alt="Pad" className="pad-image mb-3 " />
            </div>
          </div>
          <div className="col-lg-7 col-sm-12 px-5 align-self-center text-center">
            <OwlCarousel
              className="mb-1"
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
              {role === "SELLER"
                ? getProductIdSellerResult
                  ? getProductIdSellerResult.image.map((item, index) => {
                      return (
                        <div className="card-thumb" key={index}>
                          <Button hasShadow className="thumb-img">
                            <img
                              className=" img-fluid"
                              src={`../images/${item}`}
                              alt=""
                            />
                          </Button>
                        </div>
                      );
                    })
                  : "Image Tidak Ditemukan"
                : getProductIdResult
                ? getProductIdResult.image.map((item, index) => {
                    return (
                      <div className="card-thumb" key={index}>
                        <Button hasShadow className="thumb-img">
                          <img
                            className=" img-fluid"
                            src={`../images/${item}`}
                            alt=""
                          />
                        </Button>
                      </div>
                    );
                  })
                : "Image Tidak Ditemukan"}
            </OwlCarousel>
            <div className="size ms-2">
              <h3>Size Ready</h3>
              <div className="size-ready justify-content-center">
                {getListSizeResult.data
                  ? getListSizeResult.data.map((item) => {
                      return (
                        <Button className="mx-2 mb-2" isSecondary key={item.id}>
                          {item.size}
                        </Button>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
