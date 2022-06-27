import Button from "elements/Button";
import { formatPrice, titleShorten } from "utils/defaultFormat";

function ProductItem({ id, name, Category, price, image }) {
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
          alt={`${image[0]}`}
          className="img-fluid product-img mb-4"
        />
        <div className="product-name mb-1">
          <h4 style={{ height: 45 }}>{titleShorten(name, 50, " ")}</h4>
        </div>
        <p>{Category.name}</p>
        <h4>Rp. {formatPrice(price)}</h4>
      </div>
    </Button>
  );
}

export default ProductItem;
