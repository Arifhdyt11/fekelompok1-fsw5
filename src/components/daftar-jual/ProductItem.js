import Button from "elements/Button";

function ProductItem({ id, name, category, price, image }) {
  return (
    <Button
      type="link"
      href={`/seller-product/${id}`}
      className="col-lg-4 col-md-6 col-sm-6 "
      style={{ textDecoration: "none" }}
      key={id}
    >
      <div className="card-product p-3 mb-4">
        <img
          src={`../images/${image[0]}`}
          alt="Shoes-1"
          className="img-fluid mb-3"
        />
        <div className="product-name">
          <h4>{name.substring(0, 50)}</h4>
        </div>
        <p>{category}</p>
        <h4>Rp. {price}</h4>
      </div>
    </Button>
  );
}

export default ProductItem;
