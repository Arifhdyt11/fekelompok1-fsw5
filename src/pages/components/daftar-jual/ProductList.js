import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ product }) {
    return (

        <div class="col-lg-9 col-md-8 col-12">
            <div class="section-produk my-2">

                <div class="row">
                    <div class="col-lg-4 col-md-6 col-6">
                        <a href=" ">
                            <div class="card-plus p-3 mb-4 my-auto">
                                <i class="uil uil-plus icon-plus"></i>
                            </div>
                        </a>
                    </div>
                    {
                        product.map((item) => (
                            <ProductItem {...item} />
                        ))
                    }

                </div>

            </div>
        </div>

    );
}

export default ProductList;