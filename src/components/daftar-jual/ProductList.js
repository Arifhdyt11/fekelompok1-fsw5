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
          {product.map((item) => (
            <ProductItem {...item} />
          ))}

        </div>
      </div>
    </div>
  );
}

export default ProductList;
