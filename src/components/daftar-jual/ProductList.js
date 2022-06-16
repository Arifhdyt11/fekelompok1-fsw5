import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ product }) {
    return (

        <div className="col-lg-9 col-md-8 col-12">
            <div className="section-produk my-2">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-6">
                        <a href=" ">
                            <div className="card-plus p-3 mb-4 my-auto">
                                <i className="uil uil-plus icon-plus"></i>
                            </div>
                        </a>
                    </div>
                    {
                        product.map((item) => (
                            <ProductItem key={item.id} {...item} />
                        ))
                    }
                </div>
            </div>
        </div>

    );
}

export default ProductList;