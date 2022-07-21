import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "store/actions/transactionAction";
import Swal from "sweetalert2";
import { formatDate, formatPrice } from "utils/defaultFormat";

function handleError(message) {
  return Swal.fire({
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: 3500,
  });
}

export default function ModalNegoBuyer({ item, dataProduct }) {
  const { addTransactionResult } = useSelector(
    (state) => state.TransactionReducer
  );

  const date = new Date();
  const [price, setPrice] = useState("");

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const hargaAwal = dataProduct.price;
    // const reqHargaTawar = (10 / 100) * hargaAwal;
    const reqHargaTawar = hargaAwal - (10 / 100) * hargaAwal;

    if (price < reqHargaTawar) {
      handleError(
        `Harga Tawar Maksimal 10% Dari Harga Awal. Yaitu : ${reqHargaTawar}`
      );
    }
    e.preventDefault();

    if (price >= reqHargaTawar) {
      dispatch(addTransaction({ productsizeId: item.id, priceBid: price }));
    }
  };

  useEffect(() => {
    if (addTransactionResult) {
      setPrice("");
    }
  }, [addTransactionResult, dispatch]);

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
                className="btn-close mx-2 my-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <h5>Masukan Harga Tawar</h5>
              <p className="mt-3 mb-3">
                Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu
                akan segera dihubungi penjual.
              </p>

              <div className="card w-100 mb-4">
                <div className="card-body">
                  <h3 style={{ fontSize: 20 }}>Product Match</h3>
                  <p>{formatDate(date, "full")}</p>
                  <img
                    className="img-fluid mb-3"
                    src={dataProduct.image[0]}
                    alt="Customer 1"
                    style={{ width: "50%" }}
                  />
                  <div className="mb-3">
                    <h6>Penawaran Product</h6>
                    <h5>{dataProduct.name}</h5>
                  </div>
                  <div className="mb-3">
                    <h6>Harga Awal</h6>
                    <h5>
                      <s>Rp. {formatPrice(dataProduct.price)}</s>
                    </h5>
                  </div>
                  <div>
                    <h6>Ajukan Harga Tawar</h6>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3 mx-5 ">
                        <input
                          type="number"
                          className="form-control search-form text-center"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={price}
                          onChange={handlePrice}
                        />
                      </div>
                      <button
                        className="btn btn-primary btn-shadow px-5 py-2 "
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Kirim
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
