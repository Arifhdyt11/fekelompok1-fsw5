import { useState } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProduct } from "store/actions/productAction";

import Button from "elements/Button";
import img from "assets/images/ilustrasi.svg";

//------------------BAKALAN DIHAPUS---------------
import { getInitialData } from "json/data.js";
import { getKategoriData } from "json/kategori-produk";
//--------------------HAPUS NANTI---------------------

function shorten(str, maxLen, separator = " ") {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}

function numberSeparator(number) {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function CheckCategory(categoryId) {
  if (categoryId === 1) {
    return "Sneakers";
  } else if (categoryId === 2) {
    return "Sport";
  } else if (categoryId === 3) {
    return "Casual";
  } else {
    return "no";
  }
}

export default function Product(props) {
  const { getListProductResult, getListProductLoading, getListProductError } =
    useSelector((state) => state.ProductReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct());
  }, [dispatch]);

  //-----------------------------DUMMY--------------------
  const [product, setProduct] = useState(getInitialData());
  const [kategori] = useState(getKategoriData());

  const menuItems = [...new Set(getKategoriData().map((Val) => Val.category))];

  const filterItem = (curcat) => {
    const newItem = getInitialData().filter((newVal) => {
      return newVal.category === curcat;
    });
    setProduct(newItem);
  };
  //---------------------------------------------------------
  return (
    <>
      <section
        className="container section-product mt-2 mb-5"
        ref={props.refCallToAction}
      >
        <div className="filter mb-5">
          <h3>Kategori</h3>
          <div className="justify-content-start my-2">
            <Button
              className="btn active btn-filter me-3 my-2"
              hasShadow
              isSecondary
              href="/"
              type="link"
              onClick={() => setProduct(getInitialData())}
            >
              All
            </Button>

            {menuItems.map((kategori, index) => {
              return (
                <Button
                  className="btn btn-filter me-3 my-2"
                  hasShadow
                  isSecondary
                  href=""
                  type="link"
                  onClick={() => filterItem(kategori)}
                  key={index}
                >
                  {kategori}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="product">
          <div className="row justify-content-center">
            {getListProductResult ? (
              getListProductResult.data.length === 0 ? (
                <div className="d-flex justify-content-center null-illustration p-5">
                  <div>
                    <img src={img} alt="" className="img-fluid mb-3" />
                    <p>Produk tidak ditemukan</p>
                  </div>
                </div>
              ) : (
                getListProductResult.data.map((item) => {
                  return (
                    <Button
                      type="link"
                      href={`/product/${item.id}`}
                      className="col-lg-3 col-md-6 col-sm-12  "
                      style={{ textDecoration: "none" }}
                      key={item.id}
                    >
                      <div className="card-product p-3 mb-4">
                        <img
                          src={`../images/${item.image[0]}`}
                          alt={`${item.image[0]}`}
                          className="img-fluid product-img mb-4"
                        />
                        <div className="product-name mb-1">
                          <h4 style={{ height: 45 }}>
                            {shorten(item.name, 40, " ")}
                          </h4>
                        </div>
                        <p>{CheckCategory(item.categoryId)}</p>
                        <h4>Rp. {numberSeparator(item.price)}</h4>
                      </div>
                    </Button>
                  );
                })
              )
            ) : getListProductLoading ? (
              <h3>Loading....</h3>
            ) : (
              <p>{getListProductError ? getListProductError : "Data Kosong"}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
