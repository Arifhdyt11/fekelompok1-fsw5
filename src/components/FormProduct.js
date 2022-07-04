import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getListProduct,
  getProductId,
  updateProduct,
} from "store/actions/productAction";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { storage } from "../firebase/index";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Button from "elements/Button";
import { useDropzone } from "react-dropzone";
import fotoProduct from "../assets/images/addProduct.png";

// function ClearInputImage() {
//   document.getElementById("formFile").value = "";
// }

export default function FormAddProduct() {
  const { accessToken } = useSelector((state) => state.AuthReducer);

  // ---------------------------AATAS JWT-----
  const location = useLocation();

  const { id } = useParams();

  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [sizeId, setSizeId] = useState("1");

  const { addProductResult, updateProductResult } = useSelector(
    (state) => state.ProductReducer
  );

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("filePhoto").src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      setImages(e.target.files[0]);
    } else {
      document.getElementById("filePhoto").src = fotoProduct;
      setImages("");
    }
  };

  console.log("images: ", images);
  console.log("progress : ", progress);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const { getProductIdResult } = location.state.getProductIdResult;
      setName(getProductIdResult.name);
      setPrice(getProductIdResult.price);
      setCategoryId(getProductIdResult.categoryId);
      setDescription(getProductIdResult.description);
      setImages(getProductIdResult.image);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (addProductResult) {
      dispatch(getListProduct());
      setName("");
      setPrice("");
      setCategoryId("");
      setDescription("");
      setImages("");
      alert("Barang berhasil diterbitkan!");
      window.location.href = "/seller";
    }
  }, [addProductResult, dispatch]);

  useEffect(() => {
    if (updateProductResult) {
      dispatch(getListProduct());
      dispatch(getProductId(id));
      setName("");
      setPrice("");
      setCategoryId("");
      setDescription("");
      setImages("");
    }
  }, [updateProductResult, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      //update

      dispatch(
        updateProduct({
          id: id,
          userId: userId,
          name: name,
          image: images,
          price: price,
          categoryId: categoryId,
          description: description,
        })
      );
    } else {
      //add
      dispatch(
        addProduct({
          name,
          image: images,
          price,
          categoryId,
          description,
        })
      );
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleCategoryId = (e) => {
    setCategoryId(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 ">
        <h4 htmlFor="productNameInput" className="form-label">
          Nama Produk
        </h4>
        <input
          type="text"
          className="form-control borderRadius"
          id="productNameInput"
          placeholder="Nama Produk"
          name="name"
          value={name}
          onChange={handleName}
        />
      </div>

      <div className="mb-3 ">
        <h4 htmlFor="priceInput" className="form-label">
          Harga Produk
        </h4>
        <input
          type="number"
          className="form-control borderRadius"
          id="priceInput"
          placeholder="Rp 0.00"
          name="price"
          value={price}
          onChange={handlePrice}
        />
      </div>

      <div className="mb-3">
        <h4 htmlFor="category" className="form-label">
          Kategori
        </h4>
        <select
          className="form-select borderRadius"
          aria-label="Default select example"
          name="category"
          value={categoryId}
          onChange={handleCategoryId}
        >
          <option value="">Pilih Kategori</option>
          <option value="1">Sneakers</option>
          <option value="2">Sport</option>
          <option value="3">Casual</option>
        </select>
      </div>

      <div className="mb-3 ">
        <h4 htmlFor="description" className="form-label">
          Deskripsi
        </h4>
        <textarea
          className="form-control borderRadius"
          id="descriptionInput"
          rows="3"
          placeholder="Contoh: Jalan Ikan Hiu 33"
          name="description"
          value={description}
          onChange={handleDescription}
        ></textarea>
      </div>

      <div className="mb-3 text-center">
        <label htmlFor="file-input" id="preview">
          <img
            id="filePhoto"
            className="display-none uploadImageInput m-2"
            src={fotoProduct}
            alt=""
            style={{ width: "110px" }}
          />
        </label>
        <input
          id="file-input"
          name="myfile"
          type="file"
          onChange={handleUpload}
          hidden
        />
      </div>

      <div className="d-flex justify-content-center">
        <Button
          className="btn px-3 py-2 borderRadius me-2"
          hasShadow
          isSecondary
          isBlock
          type="link"
          href="/preview-product"
        >
          Preview
        </Button>
        <Button
          className="btn px-3 py-2 btn-primary borderRadius ms-2"
          hasShadow
          isPrimary
          isBlock
          // onClick={ClearInputImage}
        >
          Terbitkan
        </Button>
      </div>
    </form>
  );
}
