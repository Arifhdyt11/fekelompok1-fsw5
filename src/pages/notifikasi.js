import React from "react";
import Button from "elements/Button";

export default function NotifikasiPage() {
  return (
    <>
      <div className="container mt-lg-4 mt-1  pb-1">
        <Button
          className="btn arrow-back position-absolute d-flex justify-content-center "
          nonStyle
          type="link"
          href="/"
        >
          <i className="fa-solid fa-arrow-left-long fa-lg align-self-center me-4 mt-3"></i>
          <h6 className="m-0 mt-3 d-block d-md-none">Back to Home</h6>
        </Button>
      </div>
      <section className="container  pt-5 pt-md-0 mt-4 mt-md-1">
        <h2 className="mb-4 text-center">Notifikasi</h2>

        <div className="card is-block ms-auto p-4 mb-3">
          <p className="d-flex flex-row-reverse me-4 mb-4">2021</p>
          <div className="row">
            <div className="col-lg-8 col-md-9 col-sm-12">
              <div className="row">
                <div className="col-lg-4 col-md-5 col-sm-12  text-center">
                  <img className="img-fluid mb-lg-0 mb-4" src="" alt="seller" />
                </div>
                <div className="col-lg-8 col-md-7 col-sm-12 align-self-center ">
                  <div className="mb-4">
                    <h6>Penawaran Product</h6>
                    <h5>Mobil</h5>
                  </div>
                  <div className="d-flex justify-content-start">
                    <h6 className="me-3 align-self-center">Size : </h6>
                    <h5>24px</h5>
                  </div>
                  <div className="d-flex justify-content-start mb-4 mb-md-0">
                    <div className="me-auto">
                      <h6>Harga Awal</h6>
                      <h5>Rp.1000</h5>
                    </div>
                    <div className="me-auto">
                      <h6>Ditawar</h6>
                      <h5 style={{ color: "#1abc9c", fontWeight: "500" }}>
                        Rp. 1000
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
