import Button from "elements/Button";
import React, { useEffect } from "react";
import "assets/css/notification.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationBuyer,
  getNotificationSeller,
  updateNotificationBuyer,
  updateNotificationSeller,
} from "store/actions/notificationAction";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

export default function Notification() {
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
  const {
    getNotificationBuyerResult,
    getNotificationBuyerLoading,
    getNotificationBuyerError,

    getNotificationSellerResult,
    getNotificationSellerLoading,
    getNotificationSellerError,

    updateNotificationBuyerResult,
    updateNotificationSellerResult,
  } = useSelector((state) => state.NotificationReducer);

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

  useEffect(() => {
    if (updateNotificationSellerResult) {
      dispatch(getNotificationSeller());
    } else if (updateNotificationBuyerResult) {
      dispatch(getNotificationBuyer());
    }
  }, [updateNotificationSellerResult, updateNotificationBuyerResult]);

  const handleClear = () => {
    if (user.data.role === "SELLER") {
      dispatch(updateNotificationSeller({ isReadSeller: "true" }));
    } else {
      dispatch(updateNotificationBuyer({ isReadBuyer: "true" }));
    }
  };

  // console.log(getNotificationBuyerResult);

  // console.log(product);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET);

    socket.on("connection", () => {
      // console.log("connct");
      socket.on("add-transaction", (message) => {
        console.log(message);
        dispatch(getNotificationBuyer());
        dispatch(getNotificationSeller());
      });
      socket.on("update-transaction", (message) => {
        console.log(message);
        dispatch(getNotificationBuyer());
        dispatch(getNotificationSeller());
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
  }, [getNotificationBuyer, getNotificationSeller]);

  return (
    <>
      <button
        className=" btn-none-style "
        type="button"
        id="dropdownnotif"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i
          className="fas fa-bell fa-lg"
          data-count={
            isAuthenticated
              ? user.data.role === "SELLER"
                ? getNotificationSellerResult
                  ? getNotificationSellerResult.data.filter(
                      (item) => item.isReadSeller === false
                    ).length
                  : ""
                : getNotificationBuyerResult
                ? getNotificationBuyerResult.data.filter(
                    (item) => item.isReadBuyer === false
                  ).length
                : ""
              : ""
          }
        ></i>
      </button>
      <ul
        className="dropdown-menu notification py-1 px-3"
        aria-labelledby="dropdownnotif"
        style={{ width: "40vw" }}
        id="dropdown-notif"
      >
        <li className="d-flex justify-content-between dropdown-item item">
          <Button
            className="btn me-5"
            nonStyle
            type="link"
            href="/notifications"
          >
            <h6>Notification</h6>
          </Button>
          <Button className="btn ms-5" nonStyle onClick={handleClear}>
            <p>Clear All</p>
          </Button>
        </li>
        <hr className="my-0 py-0" />
        {isAuthenticated ? (
          user.data.role === "SELLER" ? (
            getNotificationSellerResult ? (
              getNotificationSellerResult.data.filter(
                (item) => item.isReadSeller === false
              ).length === 0 ? (
                <h6 className="text-center my-4">Tidak ada notifikasi masuk</h6>
              ) : (
                getNotificationSellerResult.data
                  .filter(
                    (item, index) => item.isReadSeller === false && index < 2
                  )
                  .sort(
                    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
                  )
                  .map((item) => {
                    return (
                      <Link to="/history">
                        <li
                          key={item.id}
                          className={` dropdown-item item my-3 card-notif p-3 overflow-hidden ${
                            item.isReadSeller === false ? "isRead" : ""
                          }`}
                        >
                          <div className=" d-flex justify-content-start">
                            <img
                              className="img-fluid img-notif me-4 align-self-center"
                              src={
                                item.transactions.productSizes.products.image[0]
                              }
                              alt=""
                            />
                            <div className="">
                              <h5>
                                Penawaran Product
                                <span className="success">
                                  {item.transactions.status === "success" ? (
                                    <span className="success"> Success</span>
                                  ) : item.transactions.status === "process" ? (
                                    <span className="process"> On Process</span>
                                  ) : item.transactions.status === "pending" ? (
                                    <span className="pending"> Pending</span>
                                  ) : (
                                    <span className="cancel"> Cancel</span>
                                  )}
                                </span>
                              </h5>
                              <p>
                                {item.transactions.productSizes.products.name}
                              </p>
                              <div className="d-flex justify-content-between ">
                                <div>
                                  <p>Harga Awal</p>
                                  <p className="price">
                                    <s>
                                      Rp.
                                      {
                                        item.transactions.productSizes.products
                                          .price
                                      }
                                    </s>
                                  </p>
                                </div>
                                <i className="fa-solid fa-arrow-right-long align-self-center"></i>
                                <div className="">
                                  <p>Harga Tawar</p>
                                  <p className="price ">
                                    Rp. {item.transactions.priceBid}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </Link>
                    );
                  })
              )
            ) : (
              ""
            )
          ) : getNotificationBuyerResult ? (
            getNotificationBuyerResult.data.filter(
              (item) => item.isReadBuyer === false
            ).length === 0 ? (
              <h6 className="text-center my-4">Tidak ada notifikasi masuk</h6>
            ) : (
              getNotificationBuyerResult.data
                .filter(
                  (item, index) => item.isReadBuyer === false && index < 2
                )
                .sort(
                  (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
                )
                .map((item) => {
                  return (
                    <Link to="/history">
                      <li
                        key={item.id}
                        className={` dropdown-item item my-3 card-notif p-3 overflow-hidden ${
                          item.isReadBuyer === false ? "isRead" : ""
                        }`}
                      >
                        <div className=" d-flex justify-content-start">
                          <img
                            className="img-fluid img-notif me-4 align-self-center"
                            src={
                              item.transactions.productSizes.products.image[0]
                            }
                            alt=""
                          />
                          <div className="">
                            <h5>
                              Penawaran Product
                              <span className="success">
                                {item.transactions.status === "success" ? (
                                  <span className="success"> Success</span>
                                ) : item.transactions.status === "process" ? (
                                  <span className="process"> On Process</span>
                                ) : item.transactions.status === "pending" ? (
                                  <span className="pending"> Pending</span>
                                ) : (
                                  <span className="cancel"> Cancel</span>
                                )}
                              </span>
                            </h5>
                            <p>
                              {item.transactions.productSizes.products.name}
                            </p>
                            <div className="d-flex justify-content-between ">
                              <div>
                                <p>Harga Awal</p>
                                <p className="price">
                                  <s>
                                    Rp.
                                    {
                                      item.transactions.productSizes.products
                                        .price
                                    }
                                  </s>
                                </p>
                              </div>
                              <i className="fa-solid fa-arrow-right-long align-self-center"></i>
                              <div className="">
                                <p>Harga Tawar</p>
                                <p className="price ">
                                  Rp. {item.transactions.priceBid}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  );
                })
            )
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <hr className="my-0 py-0" />
        <li className="dropdown-item text-center my-0 py-2">
          <Button className="btn" isPrimary type="link" href="/notifications">
            Load More Notification
          </Button>
        </li>
      </ul>
    </>
  );
}
