import React, { useEffect } from "react";
import Button from "elements/Button";
import Seller from "assets/images/seller-1.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishlist,
  getListWishlistBuyer,
} from "store/actions/wishlistAction";

import { formatPrice, titleShorten } from "utils/defaultFormat";
export default function WishlistProduct() {
  const { accessToken } = useSelector((state) => state.AuthReducer);

  const {
    getListWishlistBuyerResult,
    getListWishlistBuyerLoading,
    getListWishlistBuyerError,
    deleteWishlistResult,
  } = useSelector((state) => state.WishlistReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListWishlistBuyer(accessToken));
  }, [dispatch]);

  useEffect(() => {
    if (deleteWishlistResult) {
      dispatch(getListWishlistBuyer(accessToken));
    }
  }, [deleteWishlistResult, dispatch]);

  console.log(getListWishlistBuyerResult);
  return (
    <section className="container">
      <h2 className="text-center mb-4">Wishlist</h2>
      <div className="row">
        {getListWishlistBuyerResult ? (
          getListWishlistBuyerResult.data.map((item) => {
            return (
              <div className="col-lg-3 col-md-6 col-sm-6 ">
                <div className="card-product p-3 mb-4">
                  <div className="d-md-flex flex-row-reverse">
                    <Button
                      nonStyle
                      style={{ textDecoration: "none", color: "#3252df" }}
                      onClick={() =>
                        dispatch(deleteWishlist(item.id, accessToken))
                      }
                    >
                      <i className="fa-solid fa-heart fa-xl"></i>
                    </Button>
                  </div>
                  <Button
                    type="link"
                    href={`/product/${item.products.id}`}
                    className=" "
                    style={{ textDecoration: "none" }}
                    key={item.products.id}
                  >
                    <img
                      src={`../images/${item.products.image[0]}`}
                      alt={`${item.products.image[0]}`}
                      className="img-fluid product-img mb-4"
                    />
                    <div className="product-name mb-1">
                      <h4 style={{ height: 45 }}>
                        {titleShorten(item.products.name, 50, " ")}
                      </h4>
                    </div>
                    <p>{item.products.categories}</p>
                    <h4 style={{ color: "#1abc9c" }}>
                      Rp. {formatPrice(item.products.price)}
                    </h4>
                    <hr />
                    <div className="row">
                      <div className="col-3">
                        <img src={Seller} alt="" />
                      </div>
                      <div className="col-9 ps-4 align-self-center">
                        <h6>{item.user.name}</h6>
                        <h5 className="mb-0">{item.user.name}</h5>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            );
          })
        ) : getListWishlistBuyerLoading ? (
          <h3>Loading...</h3>
        ) : (
          <p>
            {getListWishlistBuyerError ? getListWishlistBuyerError : "Error..."}
          </p>
        )}
      </div>
    </section>
  );
}
