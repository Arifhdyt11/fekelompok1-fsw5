import TransactionBody from "components/TransactionBody";
import Navbar from "components/Navbar";
import React, { useEffect } from "react";

export default function Transaction() {
  useEffect(() => {
    document.title = "Shoesnarian | Transaction";
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Navbar />
      <TransactionBody />
    </>
  );
}
