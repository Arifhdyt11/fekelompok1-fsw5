import React from "react";
import { getInitialData } from "../../json/data.js";

function ProductSidebar({ filterItem, setProduct, menuItems }) {
  let total = getInitialData().length;

  return (
    <div className="col-lg-3 col-md-4 col-12">
      <div className="section-sidebar my-2">
        <h5>Categories </h5>
        <ul className="list-group">
          <li
            onClick={() => setProduct(getInitialData())}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
          >
            <div className="icon-list">
              <i className="uil uil-cube item-icon"></i> Semua Produk
            </div>
            <span className="badge bg-primary">{total}</span>
          </li>

          <li
            onClick={() => filterItem("Diminati")}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
          >
            <div className="icon-list">
              <i className="uil uil-heart item-icon"></i> Diminati
            </div>
            <span className="badge bg-primary"></span>
          </li>
          <li
            onClick={() => filterItem("Terjual")}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
          >
            <div className="icon-list">
              <i className="uil uil-dollar-alt item-icon"></i> Terjual
            </div>
            <span className="badge bg-primary"></span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductSidebar;
