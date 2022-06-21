import Navbar from "components/Navbar";
import WishlistProduct from "components/WishlistProduct";
import React, { useState } from "react";

import { getInitialData } from "json/data.js";

export default function Wishlist() {
  // getdata
  const [product] = useState(getInitialData());

  return (
    <>
      <Navbar />
      <WishlistProduct product={product} />
    </>
  );
}
