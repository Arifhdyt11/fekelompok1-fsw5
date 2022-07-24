import Button from "elements/Button";

import ProductNotFound from "assets/images/ilustrasi.svg";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListTransactionBuyer,
  getListTransactionSeller,
} from "store/actions/transactionAction";
import TransactionBuyer from "./TransactionBuyer";
import TransactionSeller from "./TransactionSeller";
import CardLoading from "components/CardLoading";
import { io } from "socket.io-client";

export default function TransactionBody() {
  const { user } = useSelector((state) => state.AuthReducer);
  const {
    getListTransactionSellerResult,
    getListTransactionSellerLoading,
    getListTransactionSellerError,

    getListTransactionBuyerResult,
    getListTransactionBuyerLoading,
    getListTransactionBuyerError,
  } = useSelector((state) => state.TransactionReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user.data.role === "SELLER") {
      dispatch(getListTransactionSeller());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user.data.role === "BUYER") {
      dispatch(getListTransactionBuyer());
    }
  }, [dispatch]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET);

    socket.on("connection", () => {
      if (user.data.role === "SELLER") {
        socket.on("add-transaction", () => {
          dispatch(getListTransactionSeller());
        });
      } else {
        socket.on("update-transaction", () => {
          dispatch(getListTransactionBuyer());
        });
      }
    });
  }, [dispatch, getListTransactionBuyer, getListTransactionSeller]);
  return (
    <>
      <div className="container mt-lg-4 mt-1  pb-1">
        <Button
          className="btn arrow-back position-absolute d-flex justify-content-center "
          nonStyle
          type="link"
          href={user.data.role === "SELLER" ? "/seller" : "/"}
        >
          <i className="fa-solid fa-arrow-left-long fa-lg align-self-center me-4 mt-3"></i>
          <h6 className="m-0 mt-3 d-block d-md-none">Back to Home</h6>
        </Button>
      </div>
      <section className="container  pt-5 pt-md-0 mt-4 mt-md-1">
        {user.data.role === "SELLER" ? (
          <h2 className="mb-4 text-center">Transaksi</h2>
        ) : (
          <h2 className="mb-4 text-center">History Transaksi</h2>
        )}
        {user.data.role === "SELLER" ? (
          getListTransactionSellerResult ? (
            getListTransactionSellerResult.data.length === 0 ? (
              <div className="d-flex justify-content-center null-illustration p-5">
                <div className="text-center">
                  <img
                    src={ProductNotFound}
                    alt=""
                    className="img-fluid mb-3"
                  />
                  <p>Transaksi tidak ditemukan</p>
                </div>
              </div>
            ) : (
              getListTransactionSellerResult.data
                .sort(
                  (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
                )
                .map((item, index) => {
                  return (
                    <TransactionSeller key={item.id} {...item} index={index} />
                  );
                })
            )
          ) : getListTransactionSellerLoading ? (
            <CardLoading transaction col="1" count="2" />
          ) : (
            <p>
              {getListTransactionSellerError
                ? getListTransactionSellerError
                : ""}
            </p>
          )
        ) : getListTransactionBuyerResult ? (
          getListTransactionBuyerResult.data.length === 0 ? (
            <div className="d-flex justify-content-center null-illustration p-5">
              <div className="text-center">
                <img src={ProductNotFound} alt="" className="img-fluid mb-3" />
                <p>Transaksi tidak ditemukan</p>
                <p>Silahkan Belanja</p>
              </div>
            </div>
          ) : (
            getListTransactionBuyerResult.data
              .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
              .map((item, index) => {
                return (
                  <TransactionBuyer key={item.id} {...item} index={index} />
                );
              })
          )
        ) : getListTransactionBuyerLoading ? (
          <CardLoading transaction col="1" count="2" />
        ) : (
          <p>
            {getListTransactionBuyerError ? getListTransactionBuyerError : ""}
          </p>
        )}
      </section>
    </>
  );
}
