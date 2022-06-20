import React from "react";
import Button from "elements/Button";

export default function ModalStatusInfoPenawar(productbid) {
  return (
    <div id="modalInfoProduk">
      <div
        key={productbid.id}
        className="modal fade"
        id="modalStatusInfoPenawar"
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
              <h4 className="mb-3">Perbarui status penjualan produkmu</h4>
              <div className="card w-100 mb-4">
                <div className="card-body">
                  <div className="form-check text-start">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Berhasil terjual
                      <p>
                        Pastikan kamu telah sepakat menjual produk ini kepada
                        pembeli
                      </p>
                    </label>
                  </div>
                  <div className="form-check text-start">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Batalkan Transaksi
                      <p>
                        Kamu membatalkan transaski produk ini dengan pembeli
                      </p>
                    </label>
                  </div>
                </div>
              </div>
              <Button className="btn px-5 py-2" isPrimary hasShadow isExternal>
                Kirim
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
