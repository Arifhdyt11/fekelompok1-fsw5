import Button from "elements/Button";
function ProductItem({ id, name, category, price, image }) {
  return (
    <Button
      type="link"
      href={`/seller-product/${id}`}
      className="col-lg-4 col-md-6 col-sm-6 card-product mx-3 p-3 mb-4"
      style={{ textDecoration: "none" }}
      key={id}
    >
      <img src={image} alt="Shoes-1" className="img-fluid mb-3" />
      <div className="product-name">
        <h4>{name.substring(0, 28)}</h4>
      </div>
      <p>{category}</p>
      <h4>Rp. {price}</h4>
    </Button>
  );
}

export default ProductItem;
