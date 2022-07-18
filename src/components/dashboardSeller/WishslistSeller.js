import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListWishlistSeller } from "store/actions/wishlistAction";

import img from "assets/images/ilustrasi.svg";
import ProductItem from "./ProductItem";

import _ from "lodash";

import { io } from "socket.io-client";
import CardLoading from "components/CardLoading";

export default function WishlistSeller() {
  const { user, accessToken } = useSelector((state) => state.AuthReducer);
  const sellerId = user.data.id;
  const {
    getListWishlistSellerResult,
    getListWishlistSellerLoading,
    getListWishlistSellerError,
  } = useSelector((state) => state.WishlistReducer);

  const [wishlist, setWishlist] = useState([]);

  if (user.data.role === "SELLER") {
    var initialWishlist = getListWishlistSellerResult.data;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.data.role === "SELLER") {
      setWishlist(dispatch(getListWishlistSeller(sellerId, accessToken)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user.data.role === "SELLER") {
      setWishlist(initialWishlist);
    }
  }, [initialWishlist]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET);

    socket.on("connection", () => {
      // console.log("connct");
      socket.on("add-wishlist", () => {
        dispatch(getListWishlistSeller(sellerId, accessToken));
      });
      socket.on("delete-wishlist", () => {
        dispatch(getListWishlistSeller(sellerId, accessToken));
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
  }, [getListWishlistSeller]);

  const dataWishlist = wishlist;
  const uniqueWishlist = _(dataWishlist)
    .groupBy("products.id")
    .map((items) => ({
      count: items.length,
      ...items[0],
    }))
    .value();

  console.log(dataWishlist);

  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="section-produk my-2 s">
        <div className="row justify-content-center">
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
