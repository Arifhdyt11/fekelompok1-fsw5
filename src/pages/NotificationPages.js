import React, { useEffect } from "react";
import Button from "elements/Button";
import { Link } from "react-router-dom";

import "assets/css/notification.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationBuyer,
  getNotificationSeller,
  updateNotificationBuyer,
  updateNotificationSeller,
} from "store/actions/notificationAction";
import { formatDate } from "utils/defaultFormat";
import CardLoading from "components/CardLoading";
import Navbar from "components/Navbar";

import ProductNotFound from "assets/images/ilustrasi.svg";

export default function NotifikasiPage() {
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
  const {
    getNotificationBuyerResult,
    getNotificationBuyerLoading,
    getNotificationBuyerError,

    getNotificationSellerResult,
    getNotificationSellerLoading,
    getNotificationSellerError,

    updateNotificationSellerResult,
    updateNotificationBuyerResult,
  } = useSelector((state) => state.NotificationReducer);

  useEffect(() => {
    if (user.data.role === "SELLER") {
      if (updateNotificationSellerResult) {
        dispatch(getNotificationSeller());
      }
    } else {
      if (updateNotificationBuyerResult) {
        dispatch(getNotificationBuyer());
      }
    }
  }, [updateNotificationSellerResult, updateNotificationBuyerResult]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      if (user.data.role === "SELLER") {
        dispatch(getNotificationSeller());
      } else {
        dispatch(getNotificationBuyer());
      }
    }
  }, [dispatch]);

  const handleClear = () => {
    if (user.data.role === "SELLER") {
      dispatch(updateNotificationSeller({ isReadSeller: true }));
    } else {
      dispatch(updateNotificationBuyer({ isReadBuyer: true }));
    }
  };

  // console.log(getNotificationBuyerResult);

  return (
    <>
      <Navbar />
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
        <h2 className="mb-4 text-center">Notifikasi</h2>

        {user.data.role === "SELLER" ? (
          getNotificationSellerResult ? (
            getNotificationSellerResult.data.length === 0 ? (
              ""
            ) : (
              <div className="d-flex flex-row-reverse">
                <Button
                  className="btn mb-3 btn-is-read-notif"
                  nonStyle
                  onClick={handleClear}
                >
                  Tandai Baca Semua
                </Button>
              </div>
            )
          ) : (
            ""
          )
        ) : getNotificationBuyerResult ? (
          getNotificationBuyerResult.data.length === 0 ? (
            ""
          ) : (
            <div className="d-flex flex-row-reverse">
              <Button
                className="btn mb-3 btn-is-read-notif"
                nonStyle
                onClick={handleClear}
              >
                Tandai Baca Semua
              </Button>
            </div>
          )
        ) : (
          ""
        )}
        {isAuthenticated ? (
          user.data.role === "SELLER" ? (
            getNotificationSellerResult ? (
              getNotificationSellerResult.data.length === 0 ? (
                <div className="d-flex justify-content-center null-illustration p-5 text-center">
                  <div>
                    <img
                      src={ProductNotFound}
                      alt=""
                      className="img-fluid mb-3"
                    />
                    <p>Notifikasi Tidak Ditemukan</p>
                  </div>
                </div>
              ) : (
                getNotificationSellerResult.data
                  .sort(
                    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
                  )
                  .map((item) => {
                    return (
                      <Link to="/history" key={item.id}>
                        <div
                          className={`card-notifications is-block px-4 py-3 mb-3 d-flex justify-content-start ${
                            item.isReadSeller === false ? "isRead" : ""
                          }`}
                        >
                          <img
                            className="img-fluid img-notifications align-self-center me-4"
                            src={
                              item.transactions.productSizes.products.image[0]
                            }
                            alt=""
                          />
                          <div className="align-self-center">
                            <h5>{item.message}</h5>
                            <h6>
                              {item.transactions.productSizes.products.name}
                            </h6>
                          </div>
                          <div className="ms-auto text-center">
                            {item.isReadSeller === false ? (
                              <p
                                className="me-3"
                                style={{
                                  color: "#023e7d",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                              >
                                New
                              </p>
                            ) : (
                              ""
                            )}
                            <p>{formatDate(item.createdAt, "hours")}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })
              )
            ) : getNotificationSellerLoading ? (
              <CardLoading transaction col="1" count="2" />
            ) : (
              <p>
                {getNotificationSellerError
                  ? getNotificationSellerError
                  : "error"}
              </p>
            )
          ) : getNotificationBuyerResult ? (
            getNotificationBuyerResult.data.length === 0 ? (
              <div className="d-flex justify-content-center null-illustration p-5 text-center">
                <div>
                  <img
                    src={ProductNotFound}
                    alt=""
                    className="img-fluid mb-3"
                  />
                  <p>Notifikasi Tidak Ditemukan</p>
                </div>
              </div>
            ) : (
              getNotificationBuyerResult.data
                .sort(
                  (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
                )
                .map((item) => {
                  return (
                    <Link to="/history" key={item.id}>
                      <div
                        className={`card-notifications is-block px-4 py-3 mb-3 d-flex justify-content-start ${
                          item.isReadBuyer === false ? "isRead" : ""
                        }`}
                      >
                        <img
                          className="img-fluid img-notifications align-self-center me-4"
                          src={item.transactions.productSizes.products.image[0]}
                          alt=""
                        />
                        <div className="align-self-center">
                          <h5>{item.message}</h5>
                          <h6>
                            {item.transactions.productSizes.products.name}
                          </h6>
                        </div>
                        <div className="ms-auto text-center">
                          {item.isReadBuyer === false ? (
                            <p
                              className="me-3"
                              style={{
                                color: "#023e7d",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              New
                            </p>
                          ) : (
                            ""
                          )}
                          <p>{formatDate(item.createdAt, "hours")}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })
            )
          ) : getNotificationBuyerLoading ? (
            <CardLoading transaction col="1" count="2" />
          ) : (
            <p>
              {getNotificationBuyerError ? getNotificationBuyerError : "error"}
            </p>
          )
        ) : (
          "ga login"
        )}
      </section>
    </>
  );
}
