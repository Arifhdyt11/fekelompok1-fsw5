import React, { useEffect, useRef, useState } from "react";
import Button from "elements/Button";
import { useDispatch, useSelector } from "react-redux";

import { handleSwal } from "utils/sweetAlert";

import {
  addSize,
  deleteSize,
  detailSize,
  updateSize,
} from "store/actions/sizeAction";
import { DETAIL_SIZE } from "store/types";

export default function ModalStock({ productId }) {
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [id, setId] = useState(false);

  const {
    getListSizeResult,
    getListSizeLoading,
    getListSizeError,

    detailSizeResult,

    addSizeResult,
    addSizeLoading,

    updateSizeResult,
    updateSizeLoading,

    deleteSizeResult,
    deleteSizeLoading,
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
      setId("");
      setSize("");
      setStock("");
    }
  }, [addSizeResult]);

  useEffect(() => {
    if (updateSizeResult) {
      setId("");
      setSize("");
      setStock("");
    }
  }, [updateSizeResult]);

  useEffect(() => {
    if (deleteSizeResult) {
      setId("");
      setSize("");
      setStock("");
    }
  }, [deleteSizeResult]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stock > 1000) {
      handleSwal("Stock Tidak Bisa lebih dari 1000", "error");
    }
    if (stock <= 0) {
      handleSwal("Stock Tidak Boleh Kosong atau Minus", "error");
    }

    if (id) {
      if (stock > 0 && stock <= 1000) {
        dispatch(
          updateSize({
            id: id,
            sizeId: size,
            stock: stock,
          })
        );
      }
    } else {
      // Handle If Size Already In Table Size
      if (getListSizeResult) {
        const listSize = new Map();
        getListSizeResult.data
          .filter((item) => item.productId === productId)
          .map((item) => {
            return listSize.set(`${item.sizes.id}`);
          });
        if (listSize.has(`${size}`)) {
          handleSwal("Size Already in List", "error");
        } else {
          if (stock > 0 && stock <= 1000) {
            dispatch(
              addSize({
                productId: productId,
                sizeId: size,
                stock: stock,
              })
            );
          }
        }
      }
    }
  };

  const handleSize = (e) => {
    dispatch({
      type: DETAIL_SIZE,
      payload: {
        data: false,
      },
    });
    setId("");
    setSize(e.target.value);
  };

  const handleStock = (e) => {
    setStock(e.target.value);
  };

  const handleClose = (e) => {
    setId("");
    setSize("");
    setStock("");
    dispatch({
      type: DETAIL_SIZE,
      payload: {
        data: false,
      },
    });
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
            <form onSubmit={handleSubmit} className="row mb-4 ">
              <div className="col-lg-4 col-md-4 col-sm-12 mb-3 mb-md-0">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="size"
                  value={size}
                  onChange={handleSize}
                  ref={inputRefSize}
                >
                  <option defaultValue="">Pilih Ukuran</option>
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

              <div className="col-lg-4 col-md-4 col-sm-12 mb-3 mb-md-0">
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
              <div className="col-lg-3 col-md-4 col-sm-12 mt-auto d-flex justify-content-around">
                <Button
                  className="btn me-2 w-100 d-block d-sm-none"
                  isSecondary
                  onClick={handleClose}
                >
                  Clear
                </Button>
                {addSizeLoading || updateSizeLoading || deleteSizeLoading ? (
                  <Button
                    className="btn w-100"
                    hasShadow
                    isPrimary
                    isLoading
                  ></Button>
                ) : getListSizeResult ? (
                  <Button className="btn w-100" hasShadow isPrimary>
                    Submit Stock
                  </Button>
                ) : getListSizeLoading ? (
                  <Button
                    className="btn w-100"
                    hasShadow
                    isPrimary
                    isLoading
                  ></Button>
                ) : (
                  <p>{getListSizeError ? getListSizeError : ""}</p>
                )}
              </div>
            </form>
            <Button
              className="btn mb-3 mb-md-0  d-none d-sm-block"
              isSecondary
              onClick={handleClose}
            >
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
                  {addSizeLoading || updateSizeLoading || deleteSizeLoading ? (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  ) : getListSizeResult ? (
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
                                <i className="fa-duotone  fa-pen"></i>
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
                    <tr>
                      <td>Loading...</td>
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
