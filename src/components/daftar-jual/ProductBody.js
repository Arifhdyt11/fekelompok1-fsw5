import ProductSidebar from "./ProductSidebar";
import ProductList from "./ProductList";

function ProductBody({ product }) {
  return (
    <div className="row">
      <ProductSidebar />
      <ProductList product={product} />
    </div>
  );
}

export default ProductBody;
