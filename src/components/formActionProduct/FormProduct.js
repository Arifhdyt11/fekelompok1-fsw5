import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getListProduct,
  getListProductSeller,
  updateProduct,
} from "store/actions/productAction";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "elements/Button";
import fotoProduct from "assets/images/addProduct.png";
import { handleHeaderSwal, handleSwal } from "utils/sweetAlert";

export default function FormAddProduct() {
  const { user } = useSelector((state) => state.AuthReducer);

  const {
    addProductResult,
    addProductLoading,
    updateProductResult,
    updateProductLoading,
  } = useSelector((state) => state.ProductReducer);

  const location = useLocation();

  const { id } = useParams();
  if (id) {
    var { getProductIdSellerResult } = location.state.getProductIdSellerResult;
  }

  const [images, setImages] = useState("");
  const [images2, setImages2] = useState("");
  const [images3, setImages3] = useState("");
  const [images4, setImages4] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

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
  useEffect(() => {
    if (id) {
      setName(getProductIdSellerResult.name);
      setPrice(getProductIdSellerResult.price);
      setCategoryId(getProductIdSellerResult.categoryId);
      setDescription(getProductIdSellerResult.description);
      setStatus(getProductIdSellerResult.status);
      if (getProductIdSellerResult.image[0]) {
        setImages(getProductIdSellerResult.image[0]);
        document.getElementById("filePhoto").src =
          getProductIdSellerResult.image[0];
      } else {
        document.getElementById("filePhoto").src = fotoProduct;
      }
      if (getProductIdSellerResult.image[1]) {
        setImages2(getProductIdSellerResult.image[1]);
        document.getElementById("filePhoto2").src =
          getProductIdSellerResult.image[1];
      } else {
        document.getElementById("filePhoto2").src = fotoProduct;
      }
      if (getProductIdSellerResult.image[2]) {
        setImages3(getProductIdSellerResult.image[2]);
        document.getElementById("filePhoto3").src =
          getProductIdSellerResult.image[2];
      } else {
        document.getElementById("filePhoto3").src = fotoProduct;
      }
      if (getProductIdSellerResult.image[3]) {
        setImages4(getProductIdSellerResult.image[3]);
        document.getElementById("filePhoto4").src =
          getProductIdSellerResult.image[3];
      } else {
        document.getElementById("filePhoto4").src = fotoProduct;
      }
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (addProductResult) {
      dispatch(getListProductSeller());
    }
  }, [addProductResult, dispatch]);

  useEffect(() => {
    if (addProductLoading) {
      dispatch(getListProductSeller());
    }
  }, [addProductLoading, dispatch]);

  useEffect(() => {
    if (updateProductResult) {
      dispatch(getListProduct());
      dispatch(getListProductSeller());
      setName("");
      setPrice("");
      setCategoryId("");
      setDescription("");
    }
  }, [updateProductResult, dispatch]);

  useEffect(() => {
    if (updateProductLoading) {
      dispatch(getListProduct());
      dispatch(getListProductSeller());
      setName("");
      setPrice("");
      setCategoryId("");
      setDescription("");
    }
  }, [updateProductLoading, dispatch]);

  const oldImage = [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images == "" || images2 == "" || images3 == "" || images4 == "") {
      handleSwal("Images cannot be empty", "error");
    }
    if (description === "") {
      handleSwal("Desription cannot be empty", "error");
    }
    if (categoryId === "") {
      handleSwal("Category cannot be empty", "error");
    }
    if (price == 0) {
      handleSwal("Price cannot be filled 0", "error");
    }
    if (price < 0) {
      handleSwal("Price cannot be minus", "error");
    }
    if (price === "") {
      handleSwal("Price cannot be empty", "error");
    }
    if (name === "") {
      handleSwal("Name cannot be empty", "error");
    }

    if (id) {
      //update
      if (images !== "" && getProductIdSellerResult.image[0] !== undefined) {
        if (images === getProductIdSellerResult.image[0]) {
          oldImage.push("");
        } else {
          oldImage.push(getProductIdSellerResult.image[0].substring(62, 82));
        }
      }
      if (images2 !== "" && getProductIdSellerResult.image[1] !== undefined) {
        if (images2 === getProductIdSellerResult.image[1]) {
          oldImage.push("");
        } else {
          oldImage.push(getProductIdSellerResult.image[1].substring(62, 82));
        }
      }
      if (images3 !== "" && getProductIdSellerResult.image[2] !== undefined) {
        if (images3 === getProductIdSellerResult.image[2]) {
          oldImage.push("");
        } else {
          oldImage.push(getProductIdSellerResult.image[2].substring(62, 82));
        }
      }
      if (images4 !== "" && getProductIdSellerResult.image[3] !== undefined) {
        if (images4 === getProductIdSellerResult.image[3]) {
          oldImage.push("");
        } else {
          oldImage.push(getProductIdSellerResult.image[3].substring(62, 82));
        }
      }

      const SwalUpdateProduct = {
        id: id,
        userId: user.data.id,
        name: name,
        image: [images, images2, images3, images4],
        price: price,
        categoryId: categoryId,
        description: description,
        status: status,
        oldImage,
      };

      if (
        name !== "" &&
        price !== "" &&
        price >= 1 &&
        categoryId !== "" &&
        description !== "" &&
        (images != "" || images2 != "" || images3 != "" || images4 != "")
      ) {
        if (status === "published") {
          handleHeaderSwal(
            "Data sudah benar ?",
            "Apakah anda yakin ingin menyimpan data ini ?",
            "warning",
            true,
            "Ya, Simpan!"
          ).then((result) => {
            if (result.isConfirmed) {
              dispatch(updateProduct(SwalUpdateProduct));
            }
          });
        } else {
          handleHeaderSwal(
            "Data sudah benar ?",
            "Product Akan di Simpan di Draft",
            "warning",
            true,
            "Ya, Simpan!"
          ).then((result) => {
            if (result.isConfirmed) {
              dispatch(updateProduct(SwalUpdateProduct));
            }
          });
        }
      }
    } else {
      //add
      const SwalAddProduct = {
        userId: user.data.id,
        name: name,
        image: [images, images2, images3, images4],
        price: price,
        categoryId: categoryId,
        description: description,
        status: status,
      };
      if (
        name !== "" &&
        price !== "" &&
        price >= 1 &&
        categoryId !== "" &&
        description !== ""
      ) {
        if (status === "published") {
          handleHeaderSwal(
            "Data sudah benar ?",
            "Apakah anda yakin ingin menyimpan data ini ?",
            "warning",
            true,
            "Ya, Simpan!"
          ).then((result) => {
            if (result.isConfirmed) {
              dispatch(addProduct(SwalAddProduct));
            }
          });
        } else {
          handleHeaderSwal(
            "Data sudah benar ?",
            "Product Akan di Simpan di Draft",
            "warning",
            true,
            "Ya, Simpan!"
          ).then((result) => {
            if (result.isConfirmed) {
              dispatch(addProduct(SwalAddProduct));
            }
          });
        }
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
          <option value="4">Boots</option>
          <option value="5">Formals</option>
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
          placeholder="Contoh: Jalan Kenangan No. 33"
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
          accept=".jpg,.jpeg,.png"
          onChange={handleUpload}
          hidden
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
          accept=".jpg,.jpeg,.png"
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
          accept=".jpg,.jpeg,.png"
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
          accept=".jpg,.jpeg,.png"
          onChange={handleUpload4}
          hidden
        />
      </div>
      <div className="d-flex justify-content-center">
        {getProductIdSellerResult ? (
          updateProductLoading ? (
            <Button
              className="btn px-3 py-2 btn-primary borderRadius ms-2"
              hasShadow
              isPrimary
              isBlock
              isLoading
            ></Button>
          ) : getProductIdSellerResult.status === "draft" ? (
            <>
              <Button
                className="btn px-3 py-2 btn-primary borderRadius ms-2"
                hasShadow
                isPrimary
                isBlock
                onClick={() => setStatus("published")}
              >
                Terbitkan
              </Button>
            </>
          ) : (
            <>
              <Button
                className="btn px-3 py-2 borderRadius me-2"
                hasShadow
                isSecondary
                isBlock
                onClick={() => setStatus("draft")}
              >
                Arsipkan
              </Button>
              <Button
                className="btn px-3 py-2 btn-primary borderRadius ms-2"
                hasShadow
                isPrimary
                isBlock
                onClick={() => setStatus("published")}
              >
                Terbitkan
              </Button>
            </>
          )
        ) : addProductLoading ? (
          <Button
            className="btn px-3 py-2 btn-primary borderRadius ms-2"
            hasShadow
            isPrimary
            isBlock
            isLoading
          ></Button>
        ) : (
          <>
            <Button
              className="btn px-3 py-2 borderRadius me-2"
              hasShadow
              isSecondary
              isBlock
              onClick={() => setStatus("draft")}
            >
              Preview
            </Button>
            <Button
              className="btn px-3 py-2 btn-primary borderRadius ms-2"
              hasShadow
              isPrimary
              isBlock
              onClick={() => setStatus("published")}
            >
              Terbitkan
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
