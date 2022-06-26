import Button from "elements/Button";
import React from "react";
import imgBerhasil from "assets/images/checkModal-infoPenawar.png";
export default function ModalInfoPenawar({ dataProduct }) {
  return (
    <div id="modalInfoProduk">
      <div
        key={dataProduct.id}
        className="modal fade"
        id="modalInfoPenawar"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="d-flex flex-row-reverse me-2 mt-2">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <img
                className="img-success"
                src={imgBerhasil}
                alt="notifikasi Berhasil"
                style={{ width: "5em" }}
              />
              <p className="mt-3 mb-3">
                Segera hubungi pembeli melalui whatsapp untuk transaksi
                selanjutnya
              </p>
              <div className="card w-100 mb-4">
                <div className="card-body">
                  <h3 style={{ fontSize: 20 }}>Product Match</h3>
                  <p>16 Jun, 12:45</p>
                  <div className="row mt-4" style={{ textAlign: "left" }}>
                    <div className="col-lg-4 col-sm-12 align-self-center text-center mb-4 mb-lg-0">
                      <div>
                        <img
                          className="img-fluid"
                          src={dataProduct.image}
                          alt="Customer 1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-8 col-sm-12">
                      <div className="mb-4">
                        <h5>Penawaran Product</h5>
                        <h4>{dataProduct.name}</h4>
                      </div>
                      <div className="d-flex justify-content-start">
                        <div className="me-auto">
                          <h5>Harga Awal</h5>
                          <h4>
                            <s>Rp. {dataProduct.price}</s>
                          </h4>
                        </div>
                        <div className="me-auto">
                          <h5>Ditawar</h5>
                          <h4>Rp. {dataProduct.priceBid}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className="btn px-5 py-2"
                isPrimary
                hasShadow
                isExternal
                type="link"
                href="https://wa.me/628974233275"
              >
                Hubungi Via Whatsapp <i className="fa-brands fa-whatsapp"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
