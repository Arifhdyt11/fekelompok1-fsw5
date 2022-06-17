import ProductSidebar from "./ProductSidebar";
import ProductList from "./ProductList";

function ProductBody({ product, filterItem, setProduct, menuItems }) {
  return (
    <div className="row">
      <ProductSidebar
        filterItem={filterItem}
        setProduct={setProduct}
        menuItems={menuItems}
      />
      <ProductList product={product} />
    </div>
  );
}

export default ProductBody;
