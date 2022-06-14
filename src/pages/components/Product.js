import React from "react";

export default function Product() {
  return (
    <>
      <section className="container section-product mt-0 mb-5">
        <div className="category mb-5">
          <h3>Kategori</h3>
          <div className="d-flex justify-content-start my-3">
            <a href="" className="btn btn-filter active  me-3" type="submit">
              Semua
            </a>
            <a href="" className="btn btn-filter  me-3" type="submit">
              Sneakers
            </a>
            <a href="" className="btn btn-filter me-3" type="submit">
              Boots
            </a>
            <a href="" className="btn btn-filter me-3 " type="submit">
              Sport
            </a>
            <a href="" className="btn btn-filter me-3" type="submit">
              Casual
            </a>
          </div>
        </div>
        <div className="product">
          <div class="row justify-content-center">
            <div class="col-3 card-product mx-3 p-3">
              <img
                src="./images/shoes-1.png"
                alt="Shoes-1"
                className="img-fluid mb-3"
              />
              <h4>Jordan 1 Retro High Obsidian UNC</h4>
              <p>Sneakers</p>
              <h4>Rp. 2.900.000</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
