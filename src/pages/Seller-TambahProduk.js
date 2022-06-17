import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React from "react";
import "../assets/css/tambahProduct.css";
import Button from "../elements/Button";

export default function TambahProduk() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div className="container mt-4 mb-5" id="produk">
          <div className="row ">
            <div className="col-md-1 col-sm-12">
              <a href="/" className="arrow">
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
              <form>
                <div className="mb-3 ">
                  <h4 htmlFor="productNameInput" className="form-label">
                    Nama Produk
                  </h4>
                  <input
                    type="text"
                    className="form-control borderRadius"
                    id="productNameInput"
                    placeholder="Nama Produk"
                  />
                </div>

                <div className="mb-3 ">
                  <h4 htmlFor="priceInput" className="form-label">
                    Harga Produk
                  </h4>
                  <input
                    type="text"
                    className="form-control borderRadius"
                    id="priceInput"
                    placeholder="Rp 0,00"
                  />
                </div>

                <div className="mb-3">
                  <h4 htmlFor="category" className="form-label">
                    Kategori
                  </h4>
                  <div className="col-12">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="categoryInput"
                        placeholder="Pilih Kategori"
                        style={{ borderRadius: "20px 0px 0px 20px" }}
                      ></input>
                      <button
                        type="button"
                        className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown"
                        style={{ borderRadius: "0px 15px 15px 0px" }}
                      ></button>
                      <div className="dropdown-menu">
                        <a href="/#" className="dropdown-item">
                          Sport
                        </a>
                        <a href="/#" className="dropdown-item">
                          Casual
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 ">
                  <h4 htmlFor="description" className="form-label">
                    Deskripsi
                  </h4>
                  <textarea
                    className="form-control borderRadius"
                    id="descriptionInput"
                    rows="3"
                    placeholder="Contoh: Jalan Ikan Hiu 33"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <h4>Foto Produk</h4>
                  <input type="file"></input>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col d-flex flex-column">
                      <Button
                        className="btn px-3 py-2 btn-secondary borderRadius"
                        hasShadow
                        isPrimary
                        href="/#"
                        type="link"
                      >
                        Preview
                      </Button>
                    </div>
                    <div className="col d-flex flex-column">
                      <Button
                        className="btn px-3 py-2 btn-primary borderRadius"
                        hasShadow
                        isPrimary
                        href="/#"
                        type="link"
                      >
                        Terbitkan
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
