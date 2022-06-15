import React from "react";

function ProductItem({ id, name, category, price, image }) {
    return (
        <div className="col-lg-4 col-md-6 col-6">
            <div className="card p-3 mb-4">
                <img src={image} alt={name} className="img-fluid img-sepatu" />
                <h4 className="product-name">{name}</h4>
                <p className="kategori">{category}</p>
                <p className="harga">Rp. {price}</p>
            </div>
        </div>
    );
}

export default ProductItem;