import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

import TransactionDetailBody from "components/TransactionDetailBody";

export default function TransactionDetail() {
  useEffect(() => {
    document.title = "Shoesnarian | Detail Transaction";
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Navbar />
      <TransactionDetailBody />
    </>
  );
}
