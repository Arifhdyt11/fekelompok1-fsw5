import Button from "elements/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  getListTransactionBuyer,
} from "store/actions/transactionAction";
import { formatDate } from "utils/defaultFormat";

export default function ModalNegoBuyer({ item, dataProduct }) {
  const date = new Date();
  const [price, setPrice] = useState("");

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTransaction({ productsizeId: item.id, price: price }));
  };

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
              <h4>Masukan Harga Tawar</h4>
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
                    <h5>Penawaran Product</h5>
                    <h4>{dataProduct.name}</h4>
                  </div>
                  <div className="mb-3">
                    <h5>Harga Awal</h5>
                    <h4>
                      <s>Rp. {dataProduct.price}</s>
                    </h4>
                  </div>
                  <div>
                    <h5>Ajukan Harga Tawar</h5>
                    <form onSubmit={handleSubmit}>
                      <div class="mb-3 mx-5 ">
                        <input
                          type="number"
                          class="form-control search-form text-center"
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