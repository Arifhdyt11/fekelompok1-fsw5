import imgBerhasil from "assets/images/checkModal-infoPenawar.png";
import { formatDate, formatPrice } from "utils/defaultFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionIdSeller,
  updateTransactionSeller,
} from "store/actions/transactionAction";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ModalStatusSeller({ id, dataProduct, priceBid }) {
  // const { updateTransactionSellerResult } = useSelector(
  //   (state) => state.TransactionReducer
  // );
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (updateTransactionSellerResult) {
  //     dispatch(getTransactionIdSeller(id));
  //   }
  // }, [updateTransactionSellerResult, dispatch]);

  const handleUpdate = (status) => {
    Swal.fire({
      title: "Apakah Yakin ?",
      text: `Transaksi Akan di Rubah Menjadi ${status}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Simpan!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title:
            status === "success"
              ? "Transaksi Berhasil"
              : "Transaksi Dibatalkan",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(
          updateTransactionSeller({
            transactionId: id,
            status: status,
          })
        );
      }
    });
  };
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
                <h6>Perbarui Status Penjualan Anda</h6>
                <h4 className="mt-2">
                  Apakah telah terjadi kesepakatan dalam transaksi?
                </h4>

                <div className="card w-100 mb-4">
                  <div className="card-body">
                    <p>Produk ditawar</p>
                    <img
                      className="img-fluid"
                      src={dataProduct.image[0]}
                      alt="ProductImg"
                      style={{ width: "20em" }}
                    />
                    <h5 className="mt-3">{dataProduct.name}</h5>
                    <div className="row mt-4">
                      <div className="col-6">
                        <h6>Harga Awal</h6>
                        <h5>
                          <s>Rp. {formatPrice(dataProduct.price)}</s>
                        </h5>
                      </div>
                      <div className="col-6">
                        <h6>Ditawar</h6>
                        <h5 style={{ color: "#1abc9c", fontWeight: "500" }}>
                          Rp. {formatPrice(priceBid)}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary is-block btn-shadow px-5 py-2 me-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleUpdate("success")}
                >
                  Berhasil Terjual
                </button>
                <button
                  className="btn btn-danger is-block btn-shadow px-5 py-2 ms-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleUpdate("cancel")}
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
