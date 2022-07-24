import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import img from "assets/images/ilustrasi.svg";
import ProductItem from "./ProductItem";

import _ from "lodash";

import CardLoading from "components/CardLoading";

export default function WishlistSeller() {
  const { user } = useSelector((state) => state.AuthReducer);

  const {
    getListWishlistSellerResult,
    getListWishlistSellerLoading,
    getListWishlistSellerError,
  } = useSelector((state) => state.WishlistReducer);

  const [wishlist, setWishlist] = useState([]);

  if (user.data.role === "SELLER") {
    var initialWishlist = getListWishlistSellerResult.data;
  }

  useEffect(() => {
    if (user.data.role === "SELLER") {
      setWishlist(initialWishlist);
    }
  }, [initialWishlist, user]);

  const dataWishlist = wishlist;
  const uniqueWishlist = _(dataWishlist)
    .groupBy("products.id")
    .map((items) => ({
      count: items.length,
      ...items[0],
    }))
    .value();

  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="section-produk my-2 s">
        <div className="row justify-content-start">
          {getListWishlistSellerResult ? (
            uniqueWishlist ? (
              uniqueWishlist.length === 0 ? (
                <div className="d-flex justify-content-center null-illustration p-5">
                  <div>
                    <img src={img} alt="" className="img-fluid mb-3" />
                    <p>Produk tidak ditemukan</p>
                  </div>
                </div>
              ) : (
                uniqueWishlist.map((item, index) => {
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
          ) : getListWishlistSellerLoading ? (
            <CardLoading col="3" count="3" />
          ) : (
            <p>
              {getListWishlistSellerError
                ? getListWishlistSellerError
                : "Please Reload and Try Again"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
