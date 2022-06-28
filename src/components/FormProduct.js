import React, { useState, useEffect } from "react";
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
import { ref, uploadBytesResumable } from "firebase/storage";
import Button from "elements/Button";

function ClearInputImage() {
  document.getElementById("formFile").value = "";
}

export default function FormAddProduct() {
  const location = useLocation();

  const { id } = useParams();

  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState("1");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [sizeId, setSizeId] = useState("1");

  const { addProductResult, updateProductResult } = useSelector(
    (state) => state.ProductReducer
  );

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    images.map((image) => {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //Progress function ... (shows the load bar)
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          //Error Function...
          console.log(error);
        }
        // async () => {
        //   //complete function
        //   const url = await getDownloadURL(storageRef);
        // }
      );
    });
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
      // alert("Barang berhasil diterbitkan!");
      // window.location.href = "/seller";
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

      document.getElementById("formFile").value = "";
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
      document.getElementById("formFile").value = "";
      for (let i = 0; i < 3; i++) {
        dispatch(
          addProduct({
            userId: userId,
            name: name,
            image: [images[i].name],
            price: price,
            categoryId: categoryId,
            description: description,
            sizeId: sizeId,
          })
        );
      }
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

      <div className="mb-4">
        <h4>Foto Produk</h4>
        <div>
          <img
            className="img-thumbnail"
            alt=""
            style={{ width: "120px", height: "110px" }}
          ></img>
        </div>
        <div className="mt-3">
          <input
            required
            type="file"
            className="form-control"
            id="formFile"
            multiple
            onChange={handleChange}
            accept="images/*"
          />
        </div>
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
          onClick={(ClearInputImage, handleUpload)}
        >
          Terbitkan
        </Button>
      </div>
    </form>
  );
}
