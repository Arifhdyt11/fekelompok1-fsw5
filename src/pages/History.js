import HistoryTransaction from "components/HistoryTransaction";
import Navbar from "components/Navbar";
import React, { useState } from "react";

import { getInitialData } from "json/data.js";

export default function History() {
  const [product] = useState(getInitialData());
  return (
    <>
      <Navbar />
      <HistoryTransaction product={product} />
    </>
  );
}
