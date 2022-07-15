import imgBerhasil from "assets/images/checkModal-infoPenawar.png";
import { formatDate } from "utils/defaultFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionIdSeller,
  updateTransactionSeller,
} from "store/actions/transactionAction";
import { useEffect, useState } from "react";

export default function ModalStatusSeller({ id, dataProduct, priceBid }) {
  const { updateTransactionSellerResult } = useSelector(
    (state) => state.TransactionReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (updateTransactionSellerResult) {
      dispatch(getTransactionIdSeller(id));
    }
  }, [updateTransactionSellerResult, dispatch]);

  return (
    <div>
      <div
        key={dataProduct.id}
        className="modal fade"
        id="modalStatusInfoPenawar"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog transaction">
          <div className="modal-content align-item-center">
            <div className="d-flex flex-row-reverse me-2 mt-2">
              <button
                type="button"
                className="btn-close mx-2 my-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <p>Perbarui Status Penjualan Anda</p>
                <h3 className="mt-2">
                  Apakah telah terjadi kesepakatan dalam transaksi?
                </h3>

                <div className="card w-100 mb-4">
                  <div className="card-body">
                    <p>Produk ditawar</p>
                    <img
                      className="img-fluid"
                      src={dataProduct.image[0]}
                      alt="ProductImg"
                      style={{ width: "25em" }}
                    />
                    <h5 className="mt-3">{dataProduct.name}</h5>
                    <div className="row mt-4">
                      <div className="col-5">
                        <h6>Harga Awal</h6>
                        <h5>
                          <s>Rp. {dataProduct.price}</s>
                        </h5>
                      </div>
                      <div className="col-5">
                        <h6>Ditawar</h6>
                        <h5 style={{ color: "#1abc9c", fontWeight: "500" }}>
                          Rp. {priceBid}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary is-block btn-shadow px-5 py-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() =>
                    dispatch(
                      updateTransactionSeller({
                        transactionId: id,
                        status: "success",
                      })
                    )
                  }
                >
                  Berhasil
                </button>
                <button
                  className="btn btn-danger is-block btn-shadow px-5 py-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() =>
                    dispatch(
                      updateTransactionSeller({
                        transactionId: id,
                        status: "cancel",
                      })
                    )
                  }
                >
                  Gagal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
