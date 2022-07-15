import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListWishlistSeller } from "store/actions/wishlistAction";

import img from "assets/images/ilustrasi.svg";
import ProductItem from "./ProductItem";

import _ from "lodash";

export default function WishlistSeller() {
  const { user, accessToken } = useSelector((state) => state.AuthReducer);
  const sellerId = user.data.id;
  const {
    getListWishlistSellerResult,
    getListWishlistSellerLoading,
    getListWishlistSellerError,
  } = useSelector((state) => state.WishlistReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListWishlistSeller(sellerId, accessToken));
  }, [dispatch]);

  const dataWishlist = getListWishlistSellerResult.data;
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
            <h3>Loading....</h3>
          ) : (
            <p>
              {getListWishlistSellerError
                ? getListWishlistSellerError
                : "Data Kosong"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
