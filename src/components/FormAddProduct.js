import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getListProduct } from "store/actions/productAction";
import { storage } from "../firebase/index";
import { ref, uploadBytes } from "firebase/storage";
import Button from "elements/Button";
import fotoProductAdd from "assets/images/addProduct.png";

function ClearInputImage() {
  document.getElementById("formFile").value = "";
}

export default function FormAddProduct() {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = ref(storage, `images/${image.name}`);
    uploadBytes(uploadTask, image).then(() => {
      alert("Berhasil diterbitkan");
    });
  };

  // const uploadImage = () => {
  //   if (image == null) return;
  //   const imageRef = ref(storage, `images/${image.name}`);
  //   uploadBytes(imageRef, image).then(() => {
  //     alert("Berhasil diterbitkan");
  //   });
  // };

  // const [saveImage, setSaveImage] = useState(null);
  // function handleUploadChange(e) {
  //   console.log(e.target.files[0].name);
  //   let uploaded = e.target.files[0];
  //   console.log(URL.createObjectURL(uploaded));
  //   setImage(URL.createObjectURL(uploaded));
  //   setSaveImage(uploaded);
  // }

  const [userId, setUserId] = useState("2");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sizeId, setSizeId] = useState("1");
  const [description, setDescription] = useState("");

  const { addProductResult } = useSelector((state) => state.ProductReducer);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({
        userId: userId,
        name: name,
        image: [image.name],
        price: price,
        sizeId: sizeId,
        categoryId: categoryId,
        description: description,
        sizeId: sizeId,
      })
    );
  };

  useEffect(() => {
    if (addProductResult) {
      dispatch(getListProduct());
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
    }
  }, [addProductResult, dispatch]);

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
            src={image}
            className="img-thumbnail"
            alt=""
            style={{ width: "120px", height: "110px" }}
          ></img>
        </div>
        <div className="mt-3">
          <input
            type="file"
            className="form-control"
            id="formFile"
            multiple
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
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
