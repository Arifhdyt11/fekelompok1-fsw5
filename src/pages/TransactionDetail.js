import React, { useEffect } from "react";
import Navbar from "components/Navbar";

import TransactionDetailSeller from "components/transaction/TransactionDetailSeller";

export default function TransactionDetail() {
  useEffect(() => {
    document.title = "Shoesnarian | Detail Transaction";
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Navbar />
      <TransactionDetailSeller />
    </>
  );
}
