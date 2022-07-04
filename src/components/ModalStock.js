import React, { useEffect, useRef, useState } from "react";
import Button from "elements/Button";
import { useDispatch, useSelector } from "react-redux";

import {
  addSize,
  deleteSize,
  detailSize,
  getListSize,
  updateSize,
} from "store/actions/sizeAction";

export default function ModalStock({ productId }) {
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [id, setId] = useState(false);

  const {
    getListSizeResult,
    getListSizeLoading,
    getListSizeError,
    addSizeResult,
    detailSizeResult,
    updateSizeResult,
    deleteSizeResult,
  } = useSelector((state) => state.SizeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (detailSizeResult) {
      setSize(detailSizeResult.size);
      setStock(detailSizeResult.stock);
      setId(detailSizeResult.id);
    }
  }, [detailSizeResult]);

  useEffect(() => {
    if (addSizeResult) {
      dispatch(getListSize());
      setId("");
      setSize("");
      setStock("");
    }
  }, [addSizeResult, dispatch]);

  useEffect(() => {
    if (updateSizeResult) {
      dispatch(getListSize());
      setId("");
      setSize("");
      setStock("");
    }
  }, [updateSizeResult, dispatch]);

  useEffect(() => {
    if (deleteSizeResult) {
      dispatch(getListSize());
      setId("");
      setSize("");
      setStock("");
    }
  }, [deleteSizeResult, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(
        updateSize({
          id: id,
          size: size,
          stock: stock,
        })
      );
    } else {
      dispatch(
        addSize({
          productId: productId,
          size: size,
          stock: stock,
        })
      );
    }
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleStock = (e) => {
    setStock(e.target.value);
  };

  const handleClose = () => {
    setId(false);
    setSize("");
    setStock("");
    inputRefSize.current.value = "";
    inputRefStock.current.value = "";
  };

  const inputRefSize = useRef(null);
  const inputRefStock = useRef(null);
  return (
    <div
      className="modal fade"
      id={`modal${productId}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
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
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body pb-5">
            <form onSubmit={handleSubmit} className="row mb-3 ">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="sizeInput"
                  placeholder="Contoh Size : 43"
                  name="size"
                  value={size}
                  onChange={handleSize}
                  ref={inputRefSize}
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
                  ref={inputRefStock}
                />
              </div>
              <div className="col-auto mt-auto">
                <Button className="btn " hasShadow isPrimary>
                  Submit Stock
                </Button>
              </div>
            </form>
            <Button className="btn mb-3" isSecondary onClick={handleClose}>
              Clear
            </Button>

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
                      .filter((item) => item.productId === productId)
                      .map((item, index) => {
                        return (
                          <tr className="row" key={index}>
                            <td className="col-4">{item.size}</td>
                            <td className="col-4">{item.stock}</td>
                            <td className="col-4">
                              <Button
                                className="btn-none-style mx-1 zoom"
                                onClick={() => dispatch(detailSize(item))}
                              >
                                <i className="fa-duotone fa-lg fa-pen"></i>
                              </Button>
                              <Button
                                className="btn-none-style mx-1 zoom"
                                onClick={() => dispatch(deleteSize(item.id))}
                              >
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
