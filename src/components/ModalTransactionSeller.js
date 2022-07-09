import Button from "elements/Button";
import imgBerhasil from "assets/images/checkModal-infoPenawar.png";
import { formatDate } from "utils/defaultFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionIdSeller,
  updateTransactionSeller,
} from "store/actions/transactionAction";
import { useEffect } from "react";

export default function ModalTransactionSeller({
  id,
  dataProduct,
  price,
  createdAt,
}) {
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
    <div id="modalInfoProduk">
      <div
        key={dataProduct.id}
        className="modal fade"
        id="modalInfoPenawar"
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
                  <p>{formatDate(createdAt, "full")}</p>
                  <div className="row mt-4" style={{ textAlign: "left" }}>
                    <div className="col-lg-4 col-sm-12 align-self-center text-center mb-4 mb-lg-0">
                      <div>
                        <img
                          className="img-fluid"
                          src={dataProduct.image[0]}
                          alt="ProductImg"
                        />
                      </div>
                    </div>
                    <div className="col-lg-8 col-sm-12 ps-3">
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
                          <h4>Rp. {price}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary btn-shadow px-5 py-2"
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
                Terima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
