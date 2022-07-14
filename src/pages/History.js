import TransactionBody from "components/transaction/TransactionBody";
import Navbar from "components/Navbar";
import React, { useEffect } from "react";

export default function History() {
  useEffect(() => {
    document.title = "Shoesnarian | History Transaction";
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Navbar />
      <TransactionBody />
    </>
  );
}
