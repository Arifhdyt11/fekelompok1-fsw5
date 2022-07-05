import Navbar from "components/Navbar";
import WishlistProduct from "components/WishlistProduct";
import { useEffect } from "react";

export default function Wishlist() {
  // getdata

  useEffect(() => {
    document.title = "Shoesnarian | Wishlist";
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Navbar />
      <WishlistProduct />
    </>
  );
}
