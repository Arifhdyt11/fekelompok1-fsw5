import React from "react";

function ProductSidebar() {
    return (

        <div class="col-lg-3 col-md-4 col-12">
            <div class="section-sidebar my-2">
                <h5>Categories </h5>
                <ul class="list-group">
                    <li
                        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center category">
                        <div class="icon-list">
                            <i class="uil uil-cube item-icon"></i> Semua Produk
                        </div>
                        <span class="badge bg-primary">328</span>
                    </li>
                    <li
                        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center category">
                        <div class="icon-list">
                            <i class="uil uil-heart item-icon"></i> Diminati
                        </div>
                        <span class="badge bg-primary">112</span>
                    </li>
                    <li
                        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center category">
                        <div class="icon-list">
                            <i class="uil uil-dollar-alt item-icon"></i> Terjual
                        </div>
                        <span class="badge bg-primary">32</span>
                    </li>
                </ul>
            </div>
        </div>

    );
}

export default ProductSidebar;