import React, { useEffect } from "react";
import Button from "elements/Button";

import ProductNotFound from "assets/images/ilustrasi.svg";

import Fade from "react-reveal/Fade";
import Seller from "assets/images/seller-1.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishlist,
  getListWishlistBuyer,
} from "store/actions/wishlistAction";

import { formatPrice, titleShorten } from "utils/defaultFormat";
import CardLoading from "components/CardLoading";
export default function WishlistProduct() {
  const { user, accessToken } = useSelector((state) => state.AuthReducer);
  const buyerId = user.data.id;
  const {
    getListWishlistBuyerResult,
    getListWishlistBuyerLoading,
    getListWishlistBuyerError,
    deleteWishlistResult,
  } = useSelector((state) => state.WishlistReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListWishlistBuyer(buyerId, accessToken));
  }, [dispatch]);

  useEffect(() => {
    if (deleteWishlistResult) {
      dispatch(getListWishlistBuyer(buyerId, accessToken));
    }
  }, [deleteWishlistResult, dispatch]);

  return (
    <>
      <div className="container mt-lg-4 mt-1  pb-1">
        <Button
          className="btn arrow-back position-absolute d-flex justify-content-center "
          nonStyle
          type="link"
          href="/"
        >
          <i className="fa-solid fa-arrow-left-long fa-lg align-self-center me-4 mt-3"></i>
          <h6 className="m-0 mt-3 d-block d-md-none">Back to Home</h6>
        </Button>
      </div>
      <section className="container  pt-5 pt-md-0 mt-4 mt-md-1">
        <h2 className="text-center mb-3">Wishlist</h2>
        <p className="text-center mb-4">
          Click Heart If Want To Remove Wishlist
        </p>
        <div className="row">
          {getListWishlistBuyerResult ? (
            getListWishlistBuyerResult.data.length === 0 ? (
              <div className="d-flex justify-content-center null-illustration p-5">
                <div>
                  <img
                    src={ProductNotFound}
                    alt=""
                    className="img-fluid mb-3"
                  />
                  <p>Wishlist tidak ditemukan</p>
                  <p>Silahkan Tambahkan Wishlist</p>
                </div>
              </div>
            ) : (
              getListWishlistBuyerResult.data.map((item, index) => {
                return (
                  <div className="col-lg-3 col-md-6 col-sm-6" key={item.id}>
                    <Fade bottom delay={300 * index}>
                      <div className="card-product p-3 mb-4">
                        <div className="d-md-flex flex-row-reverse">
                          <button
                            style={{
                              textDecoration: "none",
                              color: "#3252df",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() =>
                              dispatch(deleteWishlist(item.id, accessToken))
                            }
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Delete Wihslist"
                          >
                            <i className="fa-solid fa-heart fa-xl"></i>
                          </button>
                        </div>
                        <Button
                          type="link"
                          href={`/product/${item.products.id}`}
                          className=" "
                          style={{ textDecoration: "none" }}
                          key={item.products.id}
                        >
                          <img
                            src={`${item.products.image[0]}`}
                            alt={`${item.products.image[0]}`}
                            className="img-fluid product-img mb-4"
                          />
                          <div className="product-name mb-1">
                            <h4 style={{ height: 45 }}>
                              {titleShorten(item.products.name, 50, " ")}
                            </h4>
                          </div>
                          <p>{item.products.categories.name}</p>
                          <h4>Rp. {formatPrice(item.products.price)}</h4>
                          <hr />
                          <div className="row">
                            <div className="col-3">
                              <img src={Seller} alt="" />
                            </div>
                            <div className="col-9 ps-4 align-self-center">
                              <h6>
                                {item.products
                                  ? item.products.userAsSeller.name
                                  : ""}
                              </h6>
                              <h5 className="mb-0">
                                {item.products
                                  ? item.products.userAsSeller.city
                                  : ""}
                              </h5>
                            </div>
                          </div>
                        </Button>
                      </div>
                    </Fade>
                  </div>
                );
              })
            )
          ) : getListWishlistBuyerLoading ? (
            <CardLoading col="4" count="8" />
          ) : (
            <p>
              {getListWishlistBuyerError
                ? getListWishlistBuyerError
                : "Error..."}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
