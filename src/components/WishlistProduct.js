import React from "react";
import Button from "elements/Button";
import Seller from "assets/images/seller-1.png";
export default function WishlistProduct({ product }) {
  return (
    <section className="container">
      <h2 className="text-center mb-4">Wishlist</h2>
      <div className="row">
        {product
          .filter((item) => item.status === "Diminati")
          .map((item) => {
            return (
              <Button
                type="link"
                href={`/product/${item.id}`}
                className="col-lg-3 col-md-6 col-sm-12  "
                style={{ textDecoration: "none" }}
                key={item.id}
              >
                <div className="card-product p-3 mb-4">
                  <Button
                    nonStyle
                    type="link"
                    href="/seller"
                    className="d-flex flex-row-reverse"
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-solid fa-heart fa-lg"></i>
                  </Button>
                  <img
                    src={item.image}
                    alt="Shoes-1"
                    className="img-fluid mb-3"
                  />
                  <div className="product-name">
                    <h4>{item.name.substring(0, 50)}</h4>
                  </div>
                  <p>{item.category}</p>
                  <h4>
                    <s>Rp. {item.price}</s>
                  </h4>
                  <h4 style={{ color: "#1abc9c" }}>Rp. 200.000</h4>
                  <hr />
                  <div className="row">
                    <div className="col-3">
                      <img src={Seller} alt="" />
                    </div>
                    <div className="col-9 ps-4 align-self-center">
                      <h6>Nama penjual</h6>
                      <h5 className="mb-0">kota</h5>
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
      </div>
    </section>
  );
}
