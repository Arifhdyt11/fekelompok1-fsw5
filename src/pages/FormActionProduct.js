import Footer from "components/Footer";
import Navbar from "components/Navbar";

import "assets/css/tambahProduct.css";

import FormProduct from "components/FormProduct";
import Button from "elements/Button";

function ShowTitle({ isAdd }) {
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
      <div className="container mt-4 mb-5" id="produk">
        <ShowTitle isAdd={isAdd} />
        <div className="row ">
          <div className="col-md-1 col-sm-12">
            <Button type="link" href="/seller" className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
            </Button>
          </div>

          <div className="col-md-11 col-sm-12 mb-4">
            <FormProduct />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}