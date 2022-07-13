import Footer from "components/Footer";
import Navbar from "components/Navbar";

import "assets/css/tambahProduct.css";

import FormProduct from "components/formActionProduct/FormProduct";
import Button from "elements/Button";
import { useEffect } from "react";

function ShowTitle({ isAdd }) {
  useEffect(() => {
    if (isAdd === "yes") {
      document.title = "Shoesnarian | Add Product";
      window.scrollTo(0, 0);
    } else {
      document.title = "Shoesnarian | Update Product";
      window.scrollTo(0, 0);
    }
  });

  if (isAdd === "yes") {
    return <h2 className="text-center mb-5">Tambah Produk</h2>;
  } else {
    return <h2 className="text-center mb-5">Update Produk</h2>;
  }
}

export default function FormActionProduct({ isAdd }) {
  return (
    <>
      <Navbar />
      <div className="container mt-lg-4 mt-1  pb-1">
        <Button
          className="btn arrow-back position-absolute d-flex justify-content-center "
          nonStyle
          type="link"
          href="/seller"
        >
          <i class="fa-solid fa-arrow-left-long fa-lg align-self-center me-4 mt-3"></i>
          <h6 className="m-0 mt-3 d-block d-md-none">Back to Home</h6>
        </Button>
      </div>
      <section className="container pt-5 pt-md-0 mt-4 mt-md-1 mb-5" id="produk">
        <ShowTitle isAdd={isAdd} />
        <FormProduct />
      </section>
      <Footer />
    </>
  );
}
