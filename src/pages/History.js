import TransactionBody from "components/TransactionBody";
import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";

import { getInitialData } from "json/data.js";

export default function History() {
  useEffect(() => {
    document.title = "Shoesnarian | History Transaction";
    window.scrollTo(0, 0);
  });

  const [product] = useState(getInitialData());
  return (
    <>
      <Navbar />
      <TransactionBody product={product} />
    </>
  );
}
