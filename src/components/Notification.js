import Button from "elements/Button";
import React, { useEffect, useState } from "react";
import "assets/css/notification.css";

import socketClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getListTransactionBuyer } from "store/actions/transactionAction";
export default function Notification() {
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const {
    getListTransactionBuyerResult,
    getListTransactionBuyerLoading,
    getListTransactionBuyerError,
  } = useSelector((state) => state.TransactionReducer);

  const getInitialData = getListTransactionBuyerResult.data;

  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    if (user.data.role === "BUYER") {
      setTransaction(dispatch(getListTransactionBuyer()));
    }
  }, [dispatch]);

  useEffect(() => {
    setTransaction(getInitialData);
  }, [getInitialData]);

  // setTransaction(["adasd", "asdasd"]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (user.data.role === "BUYER") {
  //       const { REACT_APP_SOCKET } = process.env;
  //       const SERVER = `${REACT_APP_SOCKET}`;

  //       var socket = socketClient(SERVER);
  //       console.log(socket);
  //       socket.on("connection", (data) => {
  //         console.log(`I'm connected with the back-end`);

  //         // data.on("add-transaction", (newTransaction) => {
  //         //   console.log(newTransaction);
  //         //   // setTransaction((transaction) => [...transaction, newTransaction]);
  //         //   // dispatch(getListTransactionBuyer());
  //         // });
  //       });

  //       socket.on("disconnect", () => {
  //         console.log("Socket disconnecting");
  //       });
  //     }
  //   }
  // }, []);

  // console.log(transaction);
  const handleClear = (e) => {
    setTransaction([]);
  };
  // if (transaction) {
  //   const data = transaction.map((item) => {
  //     console.log(item.productSizes.products);
  //   });
  // }

  if (transaction) {
    var countTransaction = transaction.length;
  }
  return (
    <>
      <button
        className=" btn-none-style "
        type="button"
        id="dropdownnotif"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fas fa-bell fa-lg" data-count={countTransaction}></i>
      </button>
      <ul
        className="dropdown-menu notification p-3"
        aria-labelledby="dropdownnotif"
        style={{ width: "40vw" }}
        id="dropdown-notif"
      >
        <li className="d-flex justify-content-between dropdown-item item">
          <Button className="btn me-5" nonStyle>
            <h5>Notification</h5>
          </Button>
          <Button className="btn ms-5" nonStyle onClick={handleClear}>
            <p>Clear All</p>
          </Button>
        </li>
        <hr className="my-0" />
        {/* {transaction
          ? transaction
              .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
              .map((item) => {
                return (
                  <li className=" dropdown-item item my-2 card-notif p-3">
                    <div className=" d-flex justify-content-start">
                      <img
                        className="img-fluid img-notif me-4 align-self-center"
                        src={item.productSizes.products.image[0]}
                        alt=""
                      />
                      <div className="">
                        <h5>
                          Penawaran Product
                          <span className="success">
                            {item.status === "success" ? (
                              <span className="success"> Success</span>
                            ) : item.status === "process" ? (
                              <span className="process"> On Process</span>
                            ) : item.status === "pending" ? (
                              <span className="pending"> Pending</span>
                            ) : (
                              <span className="cancel"> Cancel</span>
                            )}
                          </span>
                        </h5>
                        <p>{item.productSizes.products.name}</p>
                        <div className="d-flex justify-content-between">
                          <div>
                            <p>Harga Awal</p>
                            <p className="price">
                              <s>Rp. {item.productSizes.products.price}</s>
                            </p>
                          </div>
                          <i className="fa-solid fa-arrow-right-long align-self-center"></i>
                          <div>
                            <p>Harga Tawar</p>
                            <p className="price">Rp. {item.priceBid}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
          : ""} */}
      </ul>
    </>
  );
}
