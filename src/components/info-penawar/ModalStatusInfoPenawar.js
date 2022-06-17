import React from "react";

export default function ModalStatusInfoPenawar(props) {
  return (
    <div id="modalInfoProduk">
      {props.productbid.map((item) => (
        <div
          key={item}
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
                <h4>Perbarui status penjualan produkmu</h4>
                <div className="card w-100 mb-4">
                  <div className="card-body">
                    <div class="form-check text-start">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Berhasil terjual
                        <p>
                          Pastikan kamu telah sepakat menjual produk ini kepada
                          pembeli
                        </p>
                      </label>
                    </div>
                    <div class="form-check text-start">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Batalkan Transaksi
                        <p>
                          Kamu membatalkan transaski produk ini dengan pembeli
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn btn-primary whatsapp mb-4">
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
