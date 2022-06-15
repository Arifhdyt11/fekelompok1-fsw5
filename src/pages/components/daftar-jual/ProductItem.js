import React from "react";

function ProductItem({ id, name, category, price, image }) {
    return (
        <div class="col-lg-4 col-md-6 col-6">
            <div class="card p-3 mb-4">
                <img src={image} alt={name} class="img-fluid img-sepatu" />
                <h4 class="product-name">{name}</h4>
                <p class="kategori">{category}</p>
                <p class="harga">Rp. {price}</p>
            </div>
        </div>
    );
}

export default ProductItem;