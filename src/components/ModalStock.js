import React, { useEffect, useState } from "react";
import Button from "elements/Button";
import { useDispatch, useSelector } from "react-redux";

import { addSize, getListSize } from "store/actions/sizeAction";

export default function ModalStock({ id }) {
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");

  const {
    getListSizeResult,
    getListSizeLoading,
    getListSizeError,
    addSizeResult,
  } = useSelector((state) => state.SizeReducer);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addSize({
        productId: id,
        size: size,
        stock: stock,
      })
    );
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handleStock = (e) => {
    setStock(e.target.value);
  };

  useEffect(() => {
    if (addSizeResult) {
      dispatch(getListSize());
      setSize("");
      setStock("");
    }
  }, [addSizeResult, dispatch]);
  return (
    <div
      className="modal fade"
      id={`modal${id}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "768px" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>Kelola Stok</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body pb-5">
            <form onSubmit={handleSubmit} className="row mb-5 ">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="sizeInput"
                  placeholder="Contoh Size : 43"
                  name="size"
                  value={size}
                  onChange={handleSize}
                />
              </div>
              <div className="col-auto">
                <input
                  type="number"
                  className="form-control"
                  id="stockInput"
                  placeholder="Contoh Stock : 10"
                  name="stock"
                  value={stock}
                  onChange={handleStock}
                />
              </div>
              <div className="col-auto mt-auto">
                <Button className="btn" hasShadow isPrimary>
                  Submit Stock
                </Button>
              </div>
            </form>
            <div className="me-5 ms-3">
              <table className="table text-center">
                <thead>
                  <tr className="row">
                    <th className="col-4">Size</th>
                    <th className="col-4">Stock</th>
                    <th className="col-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getListSizeResult ? (
                    getListSizeResult.data
                      .filter((item) => item.productId === id)
                      .map((item) => {
                        return (
                          <tr className="row" key={item.id}>
                            <td className="col-4">{item.size}</td>
                            <td className="col-4">{item.stock}</td>
                            <td className="col-4">
                              <Button className="btn-none-style mx-1 zoom">
                                <i className="fa-duotone fa-lg fa-pen"></i>
                              </Button>
                              <Button className="btn-none-style mx-1 zoom">
                                <i className="fa-solid fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                  ) : getListSizeLoading ? (
                    <tr>Loading</tr>
                  ) : (
                    <p>{getListSizeError ? getListSizeError : "Data Kosong"}</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
