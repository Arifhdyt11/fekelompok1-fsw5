import React from "react";

import ProductSidebar from "./ProductSidebar";
import ProductList from "./ProductList";

function ProductBody({ product }) {
    return (
        <div class="row">
            <ProductSidebar />
            <ProductList product={product} />
        </div>
    );
}

export default ProductBody;