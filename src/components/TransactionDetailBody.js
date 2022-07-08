import { useSelector } from "react-redux";
import TransactionDetailSeller from "./TransactionDetailSeller";

export default function TransactionDetailBody() {
  const { user } = useSelector((state) => state.AuthReducer);

  return (
    <section className="container">
      {user.data.role === "SELLER" ? <TransactionDetailSeller /> : ""}
    </section>
  );
}
