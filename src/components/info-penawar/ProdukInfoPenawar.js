import React from "react";
import imgProduct from "../../assets/images/img-infoPenawar1.png";
import "../../assets/css/infoPenawar.css";
import Button from "../../elements/Button";
import ModalInfoPenawar from "./ModalInfoPenawar";
import infoPenawar from "../../json/infoPenawar.json";
import ModalStatusInfoPenawar from "./ModalStatusInfoPenawar";

export default function ProdukInfoPenawar(props) {
  return (
    <div className="mt-4 mb-5">
      {props.productbid.map((item) => (
        <div key={item}>
          <div className="mb-2">
            <h4 className="subTitleProduk fw-bold">
              Daftar Produkmu yang Ditawar
            </h4>
          </div>
          <div className="card produk shadow">
            <div className="card-body">
              <div className="row gx-5" id="row">
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
                  <div className="me-auto mb-2">
                    <h4 className="product-name">{item.tawaran.product}</h4>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="me-auto mb-0 productBid">
                      Harga Mulai:
                      <h4 className="priceInfoPenawaran">
                        <s>Rp. {item.tawaran.price}</s>
                      </h4>
                    </p>
                    <p className="me-auto mb-0 productBid">
                      Ditawar :<label className="notifInfoPenawaran">*</label>
                      <h4 className="priceInfoPenawaran">
                        Rp. {item.tawaran.bid}
                      </h4>
                    </p>
                  </div>
                  <div className="mt-sm-4">
                    {item.status === "berhasil" ? (
                      <div className="row">
                        <div className="col d-flex flex-column">
                          <button
                            type="button"
                            className="btn btn-secondary tolak"
                            data-bs-toggle="modal"
                            data-bs-target="#modalStatusInfoPenawar"
                          >
                            Status
                          </button>
                          <ModalStatusInfoPenawar
                            productbid={infoPenawar.pembeli}
                          />
                        </div>
                        <div className="col d-flex flex-column">
                          <button
                            type="button"
                            className="btn btn-primary terima"
                          >
                            Hubungi
                            <i className="bi bi-whatsapp ms-2"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div className="col d-flex flex-column">
                          <Button
                            className="btn btn-secondary tolak"
                            href="/#"
                            type="link"
                          >
                            Tolak
                          </Button>
                        </div>
                        <div className="col d-flex flex-column">
                          <button
                            type="button"
                            className="btn btn-primary terima"
                            data-bs-toggle="modal"
                            data-bs-target="#modalInfoPenawar"
                          >
                            Terima
                          </button>
                          <ModalInfoPenawar productbid={infoPenawar.pembeli} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
