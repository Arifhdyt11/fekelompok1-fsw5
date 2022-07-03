import ProductList from "./ProductList";
import Wishlist from "./WishslistSeller";
import { getInitialData } from "../../json/data.js";
import { useState } from "react";
function ProductBody() {
  let total = getInitialData().length;

  const [show, setShow] = useState(<ProductList />);
  const handleShow = (itShow) => {
    if (itShow === "All") {
      setShow(<ProductList />);
    }
    if (itShow === "Diminati") {
      setShow(<Wishlist />);
    }
  };
  return (
    <div className="row">
      <div className="col-lg-3 col-md-4 col-12">
        <div className="section-sidebar my-2">
          <h5>Categories </h5>
          <ul className="list-group">
            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
              onClick={() => handleShow("All")}
            >
              <div className="icon-list">
                <i className="uil uil-cube item-icon"></i> Semua Produk
              </div>
              <span className="badge bg-primary">{total}</span>
            </li>

            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
              onClick={() => handleShow("Diminati")}
            >
              <div className="icon-list">
                <i className="uil uil-heart item-icon"></i> Diminati
              </div>
              <span className="badge bg-primary"></span>
            </li>
            <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category">
              <div className="icon-list">
                <i className="uil uil-dollar-alt item-icon"></i> Terjual
              </div>
              <span className="badge bg-primary"></span>
            </li>
          </ul>
        </div>
      </div>
      {show}
    </div>
  );
}

export default ProductBody;
