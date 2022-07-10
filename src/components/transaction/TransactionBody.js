import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListTransactionBuyer,
  getListTransactionSeller,
} from "store/actions/transactionAction";
import TransactionBuyer from "./TransactionBuyer";
import TransactionSeller from "./TransactionSeller";

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
    if (user.data.role === "SELLER") dispatch(getListTransactionSeller());
  }, [dispatch]);

  useEffect(() => {
    if (user.data.role === "BUYER") dispatch(getListTransactionBuyer());
  }, [dispatch]);

  // console.log(getListTransactionSellerResult);
  return (
    <section className="container">
      {user.data.role === "SELLER" ? (
        <h2 className="mb-4 text-center">Transaksi</h2>
      ) : (
        <h2 className="mb-4 text-center">History Transaksi</h2>
      )}
      {user.data.role === "SELLER" ? (
        getListTransactionSellerResult ? (
          getListTransactionSellerResult.data
            .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
            .map((item, index) => {
              return (
                <TransactionSeller key={item.id} {...item} index={index} />
              );
            })
        ) : getListTransactionSellerLoading ? (
          <h3>Loading.....</h3>
        ) : (
          <p>
            {getListTransactionSellerError
              ? getListTransactionSellerError
              : "Error..."}
          </p>
        )
      ) : getListTransactionBuyerResult ? (
        getListTransactionBuyerResult.data
          .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
          .map((item, index) => {
            return <TransactionBuyer key={item.id} {...item} index={index} />;
          })
      ) : getListTransactionBuyerLoading ? (
        <h3>Loading.....</h3>
      ) : (
        <p>
          {getListTransactionBuyerError
            ? getListTransactionBuyerError
            : "Error..."}
        </p>
      )}
    </section>
  );
}
