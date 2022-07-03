import React, { useEffect, useState } from "react";
import Button from "elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { addSize, getListSize, updateSize } from "store/actions/sizeAction";

export default function FormSize({ productId }) {
  console.log(productId);
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [id, setId] = useState("");

  const { addSizeResult, detailSizeResult, updateSizeResult } = useSelector(
    (state) => state.SizeReducer
  );

  console.log("size", size);
  console.log(stock);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (detailSizeResult) {
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
    setId("");
    setSize("");
    setStock("");
  };

  useEffect(() => {
    if (addSizeResult) {
      dispatch(getListSize());
      setId("");
      setSize("");
      setStock("");
    }
  }, [addSizeResult, dispatch]);

  useEffect(() => {
    if (detailSizeResult) {
      setSize(detailSizeResult.size);
      setStock(detailSizeResult.stock);
      setId(detailSizeResult.id);
    }
  }, [detailSizeResult]);

  useEffect(() => {
    if (updateSizeResult) {
      dispatch(getListSize());
      setId("");
      setSize("");
      setStock("");
    }
  }, [updateSizeResult, dispatch]);

  return (
    <>
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
          <Button className="btn " hasShadow isPrimary>
            Submit Stock
          </Button>
        </div>
      </form>
      <Button className="btn mb-3" isSecondary onClick={handleClose}>
        Clear
      </Button>
    </>
  );
}
