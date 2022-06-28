import Footer from "components/Footer";
import Navbar from "components/Navbar";

import "assets/css/tambahProduct.css";

import FormAddProduct from "components/FormAddProduct";

export default function TambahProduk() {
  return (
    <>
      <Navbar />
      <div className="container mt-4 mb-5" id="produk">
        <div className="row ">
          <div className="col-md-1 col-sm-12">
            <a href="/seller" className="arrow">
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
            </a>
          </div>

          <div className="col-md-11 col-sm-12 mb-4">
            <FormAddProduct />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
