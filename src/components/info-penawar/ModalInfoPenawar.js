import React from "react";
import imgBerhasil from "../../assets/images/checkModal-infoPenawar.png";
import imgProduct from "../../assets/images/img-infoPenawar1.png";
import Button from "../../elements/Button";

export default function ModalInfoPenawar(props) {
  return (
    <div id="modalInfoProduk">
      {props.productbid.map((item) => (
        <div
          key={item}
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
                  className="notifikasiBerhasil"
                  src={imgBerhasil}
                  alt="notifikasi Berhasil"
                />
                <p className="mt-3 mb-3">
                  Segera hubungi pembeli melalui whatsapp untuk transaksi
                  selanjutnya
                </p>
                <div className="card w-100 mb-4">
                  <div className="card-body">
                    <h4>Product Match</h4>
                    <div className="row gx-5 mt-4" id="row">
                      <div className="col-auto ">
                        <div>
                          <img
                            className="imageProduct"
                            src={imgProduct}
                            alt="Customer 1"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="d-flex align-items-center mb-2">
                          <p className="me-auto mb-0 titlePenawaranProduk">
                            Penawaran Produk
                          </p>
                          <span className="text-muted extrea-small ms-2 titlePenawaranProduk">
                            16 Jun, 12:45
                          </span>
                        </div>
                        <div className="mb-2">
                          <h4 className="product-name bidmodal">
                            {item.tawaran.product}
                          </h4>
                        </div>
                        <div>
                          <p className="me-auto mb-0 productBid">
                            Harga Mulai:
                            <s
                              className="priceInfoPenawaran ms-2"
                              style={{ color: "#243162" }}
                            >
                              Rp. {item.tawaran.price}
                            </s>
                          </p>
                          <p className="me-auto mb-0 productBid">
                            Ditawar :
                            <label className="notifInfoPenawaran">*</label>
                            <label
                              className="priceInfoPenawaran ms-2"
                              style={{ color: "#243162" }}
                            >
                              Rp. {item.tawaran.bid}
                            </label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn btn-primary whatsapp mb-4">
                  Hubungi Via Whatsapp<i className="bi bi-whatsapp ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
