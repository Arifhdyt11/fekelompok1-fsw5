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
  const { accessToken } = useSelector((state) => state.AuthReducer);

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
    if (getListSizeResult) {
      setSize("");
      setStock("");
      setId("");
    }
  }, [getListSizeResult]);

  useEffect(() => {
    if (detailSizeResult) {
      setSize(detailSizeResult.sizes.id);
      setStock(detailSizeResult.stock);
      setId(detailSizeResult.id);
    }
  }, [detailSizeResult]);

  useEffect(() => {
    if (addSizeResult) {
      dispatch(getListSize(accessToken));
      setId("");
      setSize("");
      setStock("");
    }
  }, [addSizeResult, dispatch]);

  useEffect(() => {
    if (updateSizeResult) {
      dispatch(getListSize(accessToken));
      setId("");
      setSize("");
      setStock("");
    }
  }, [updateSizeResult, dispatch]);

  useEffect(() => {
    if (deleteSizeResult) {
      dispatch(getListSize(accessToken));
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
          token: accessToken,
          id: id,
          sizeId: size,
          stock: stock,
        })
      );
    } else {
      // Handle If Size Already In Table Size
      if (getListSizeResult) {
        const listSize = new Map();
        getListSizeResult.data
          .filter((item) => item.productId === productId)
          .map((item) => {
            listSize.set(`${item.sizes.id}`);
          });
        console.log(size);
        if (listSize.has(`${size}`)) {
          console.log("gagal karena sudah ada");
        } else {
          dispatch(
            addSize({
              token: accessToken,
              productId: productId,
              sizeId: size,
              stock: stock,
            })
          );
        }
      }
    }
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleStock = (e) => {
    setStock(e.target.value);
  };

  const handleClose = (e) => {
    dispatch(getListSize(accessToken));
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
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="size"
                  value={size}
                  onChange={handleSize}
                  ref={inputRefSize}
                >
                  <option selected>Pilih Ukuran</option>
                  <option value="1">36</option>
                  <option value="2">37</option>
                  <option value="3">38</option>
                  <option value="4">39</option>
                  <option value="5">40</option>
                  <option value="6">41</option>
                  <option value="7">42</option>
                  <option value="8">43</option>
                  <option value="9">44</option>
                  <option value="10">45</option>
                </select>
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
                      .sort((a, b) => a.sizes.id - b.sizes.id)
                      .map((item, index) => {
                        return (
                          <tr className="row" key={index}>
                            <td className="col-4">{item.sizes.size}</td>
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
                                onClick={() =>
                                  dispatch(deleteSize(item.id, accessToken))
                                }
                              >
                                <i className="fa-solid fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                  ) : getListSizeLoading ? (
                    <tr>
                      <td>Loading</td>
                    </tr>
                  ) : (
                    <tr>
                      <td>
                        {getListSizeError ? getListSizeError : "Data Kosong"}
                      </td>
                    </tr>
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