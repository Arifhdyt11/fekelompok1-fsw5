import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React, { useState, useEffect } from "react";
import "assets/css/tambahProduct.css";
import Button from "elements/Button";
import fotoProductAdd from "assets/images/addProduct.png";
import { addProduct, getListProduct } from "store/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

export default function TambahProduk() {
  const [image, setImage] = useState(fotoProductAdd);
  const [saveImage, setSaveImage] = useState("");
  const [userId, setUserId] = useState("1");
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDecsription] = useState("");

  const { addProductResult } = useSelector((state) => state.ProductReducer);

  const dispatch = useDispatch();

  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    console.log(URL.createObjectURL(uploaded));
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //add Product
    dispatch(
      addProduct({
        name: name,
        price: price,
        description: description,
        userId: userId,
        categoryId: categoryId,
      })
    );
  };

  useEffect(() => {
    if (addProductResult) {
      console.log("5. Masuk component did Add");
      dispatch(getListProduct());
      setName("");
      setPrice("");
      setDecsription("");
      setSaveImage("");
    }
  }, [addProductResult, dispatch]);

  return (
    <div>
      <div>
        <Navbar isLogin="yes" />
      </div>
      <div>
        <div className="container mt-4 mb-5" id="produk">
          <div className="row ">
            <div className="col-md-1 col-sm-12">
              <a href="/" className="arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-arrow-left-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
              </a>
            </div>

            <div className="col-md-11 col-sm-12 mb-4">
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className="mb-3 ">
                  <h4 htmlFor="productNameInput" className="form-label">
                    Nama Produk
                  </h4>
                  <input
                    type="text"
                    className="form-control borderRadius"
                    id="productNameInput"
                    placeholder="Nama Produk"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="mb-3 ">
                  <h4 htmlFor="priceInput" className="form-label">
                    Harga Produk
                  </h4>
                  <input
                    type="text"
                    className="form-control borderRadius"
                    id="priceInput"
                    placeholder="Rp 0,00"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <h4 htmlFor="category" className="form-label">
                    Kategori
                  </h4>
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <select
                        className="form-select  borderRadius"
                        id="inputGroupSelect01"
                        value={categoryId}
                        onChange={(event) => setCategoryId(event.target.value)}
                      >
                        <option defaultValue="0">Pilih Kategori</option>
                        <option value="1">Sneakers</option>
                        <option value="2">Casual</option>
                        <option value="3">Boots</option>
                        <option value="4">Sports</option>
                      </select>
                    </div>
                  </div>
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
                    value={description}
                    onChange={(event) => setDecsription(event.target.value)}
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
                      onChange={handleUploadChange}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col d-flex flex-column">
                      <Button
                        className="btn px-3 py-2 btn-secondary borderRadius"
                        hasShadow
                        isPrimary
                        href="/#"
                        type="link"
                      >
                        Preview
                      </Button>
                    </div>
                    <div className="col d-flex flex-column">
                      <Button
                        className="btn px-3 py-2 btn-primary borderRadius"
                        hasShadow
                        isPrimary
                        href="/#"
                        type="submit"
                      >
                        Terbitkan
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
