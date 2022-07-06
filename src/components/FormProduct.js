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
import Button from "elements/Button";
import fotoProduct from "../assets/images/addProduct.png";
import Swal from "sweetalert2";

// function ClearInputImage() {
//   document.getElementById("formFile").value = "";
// }

export default function FormAddProduct() {
  const { accessToken } = useSelector((state) => state.AuthReducer);

  // ---------------------------AATAS JWT-----
  const location = useLocation();

  const { id } = useParams();

  const [images, setImages] = useState("");
  const [images2, setImages2] = useState("");
  const [images3, setImages3] = useState("");
  const [images4, setImages4] = useState("");
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [sizeId, setSizeId] = useState("1");

  const { addProductResult, updateProductResult, getProductIdResult } =
    useSelector((state) => state.ProductReducer);

  const { user } = useSelector((state) => state.AuthReducer);

  //Upload FOTO
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

  const handleUpload2 = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("filePhoto2").src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      setImages2(e.target.files[0]);
    } else {
      document.getElementById("filePhoto2").src = fotoProduct;
      setImages2("");
    }
  };

  const handleUpload3 = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("filePhoto3").src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      setImages3(e.target.files[0]);
    } else {
      document.getElementById("filePhoto3").src = fotoProduct;
      setImages3("");
    }
  };

  const handleUpload4 = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("filePhoto4").src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      setImages4(e.target.files[0]);
    } else {
      document.getElementById("filePhoto4").src = fotoProduct;
      setImages4("");
    }
  };
  // END FOTO

  // console.log("images: ", images);
  console.log("progress : ", progress);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (id) {
  //     const { getProductIdResult } = location.state.getProductIdResult;
  //     setName(getProductIdResult.name);
  //     setPrice(getProductIdResult.price);
  //     setCategoryId(getProductIdResult.categoryId);
  //     setDescription(getProductIdResult.description);
  //     setImages(getProductIdResult.image);
  //   }
  // }, [id, dispatch]);

  useEffect(() => {
    if (addProductResult) {
      dispatch(getListProduct());
      setName("");
      setPrice("");
      setCategoryId("");
      setDescription("");
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
    }
    dispatch(getProductId(id));
  }, [updateProductResult, dispatch]);

  const oldImage = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      //update
      if (images !== "" && getProductIdResult.image[0] !== undefined) {
        oldImage.push(getProductIdResult.image[0].substring(62, 82));
      }
      if (images2 !== "" && getProductIdResult.image[1] !== undefined) {
        oldImage.push(getProductIdResult.image[1].substring(62, 82));
      }
      if (images3 !== "" && getProductIdResult.image[2] !== undefined) {
        oldImage.push(getProductIdResult.image[2].substring(62, 82));
      }
      if (images4 !== "" && getProductIdResult.image[3] !== undefined) {
        oldImage.push(getProductIdResult.image[3].substring(62, 82));
      }
      const SwalUpdateProduct = {
        id: id,
        userId: user.data.id,
        name: name,
        image: [images, images2, images3, images4],
        price: price,
        categoryId: categoryId,
        description: description,
        oldImage,
      };
      Swal.fire({
        title: "Data sudah benar ?",
        text: "Apakah anda yakin ingin menyimpan data ini ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({ title: "Data Berhasil di edit!", icon: "success" });
          dispatch(updateProduct(SwalUpdateProduct)).then(function () {
            window.location.href = "/seller";
          });
        }
      });
    } else {
      //add
      const SwalAddProduct = {
        userId: user.data.id,
        name: name,
        image: [images, images2, images3, images4],
        price: price,
        categoryId: categoryId,
        description: description,
      };
      Swal.fire({
        title: "Data sudah benar ?",
        text: "Apakah anda yakin ingin menyimpan data ini ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({ title: "Data Berhasil di tambahkan!", icon: "success" });
          dispatch(addProduct(SwalAddProduct)).then(function () {
            window.location.href = "/seller";
          });
        }
      });
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

      <div className="mb-3 text-center ">
        <label htmlFor="file-input" id="preview">
          <img
            id="filePhoto"
            className="display-none fotoProductInput m-2"
            src={fotoProduct}
            alt=""
            style={{ width: "110px" }}
          />
        </label>
        <input
          id="file-input"
          name="images"
          type="file"
          onChange={handleUpload}
          hidden
          required
        />

        <label htmlFor="file-input2" id="preview">
          <img
            id="filePhoto2"
            className="display-none fotoProductInput m-2"
            src={fotoProduct}
            alt=""
            style={{ width: "110px" }}
          />
        </label>
        <input
          id="file-input2"
          name="images2"
          type="file"
          onChange={handleUpload2}
          hidden
        />

        <label htmlFor="file-input3" id="preview">
          <img
            id="filePhoto3"
            className="display-none fotoProductInput m-2"
            src={fotoProduct}
            alt=""
            style={{ width: "110px" }}
          />
        </label>
        <input
          id="file-input3"
          name="images3"
          type="file"
          onChange={handleUpload3}
          hidden
        />

        <label htmlFor="file-input4" id="preview">
          <img
            id="filePhoto4"
            className="display-none fotoProductInput m-2"
            src={fotoProduct}
            alt=""
            style={{ width: "110px" }}
          />
        </label>
        <input
          id="file-input4"
          name="images4"
          type="file"
          onChange={handleUpload4}
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
