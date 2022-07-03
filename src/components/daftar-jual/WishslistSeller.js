import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListWishlistSeller } from "store/actions/wishlistAction";

import img from "assets/images/ilustrasi.svg";
import ProductItem from "./ProductItem";

export default function WishlistSeller() {
  const { accessToken } = useSelector((state) => state.AuthReducer);

  const {
    getListWishlistSellerResult,
    getListWishlistSellerLoading,
    getListWishlistSellerError,
  } = useSelector((state) => state.WishlistReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListWishlistSeller(accessToken));
  }, [dispatch]);
  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="section-produk my-2 s">
        <div className="row justify-content-center">
          {getListWishlistSellerResult ? (
            getListWishlistSellerResult.data.length === 0 ? (
              <div className="d-flex justify-content-center null-illustration p-5">
                <div>
                  <img src={img} alt="" className="img-fluid mb-3" />
                  <p>Produk tidak ditemukan</p>
                </div>
              </div>
            ) : (
              getListWishlistSellerResult.data.map((item) => {
                return <ProductItem key={item.id} {...item} />;
              })
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
