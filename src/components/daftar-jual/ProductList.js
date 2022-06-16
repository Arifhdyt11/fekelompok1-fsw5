import React from "react";
import ProductItem from "./ProductItem";
import img from "assets/images/ilustrasi.svg"


function ProductList({ product }) {

    return (

        <div className="col-lg-9 col-md-8 col-12">
            <div className="section-produk my-2">
                <div className="row">
                    {
                        product.length === 0 ? (
                            <div className="d-flex justify-content-center null-illustration p-5">
                                <div>
                                    <img src={img} alt="" className="img-fluid mb-3" />
                                    <p>Produk tidak ditemukan</p>
                                </div>
                            </div>
                        ) : (
                            product.map((item) => (
                                <ProductItem key={item.id} {...item} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>

    );
}

export default ProductList;