import ModalStock from "components/ModalStock";
import Button from "elements/Button";
import { formatPrice, titleShorten } from "utils/defaultFormat";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getListSize } from "store/actions/sizeAction";
function ProductItem({
  id,
  name,
  categories,
  price,
  image,
  productId,
  products,
}) {
  const { getListSizeResult } = useSelector((state) => state.SizeReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListSize());
  }, [dispatch]);

  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 ">
        <div className="card-product p-3 mb-4">
          {products ? (
            ""
          ) : (
            <div className="d-md-flex flex-row-reverse">
              {getListSizeResult ? (
                getListSizeResult.data.filter((item) => item.productId === id)
                  .length === 0 ? (
                  <span
                    className="badge bg-danger p-2"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal${id}`}
                  >
                    <i className="fa-solid fa-plus"> </i> Stok Kosong
                  </span>
                ) : (
                  <span
                    className="badge bg-primary p-2"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal${id}`}
                  >
                    <i className="fa-solid fa-plus"> </i> Stok
                  </span>
                )
              ) : (
                ""
              )}
            </div>
          )}
          {products ? (
            <Button
              type="link"
              href={`/seller-product/${productId}`}
              className=" "
              style={{ textDecoration: "none" }}
              key={id}
            >
              <img
                src={`../images/${products.image[0]}`}
                alt={`${products.image[0]}`}
                className="img-fluid product-img mb-4"
              />
              <div className="product-name mb-1">
                <h4 style={{ height: 45 }}>
                  {titleShorten(products.name, 50, " ")}
                </h4>
              </div>
              <p>...</p>
              <h4>Rp. {formatPrice(products.price)}</h4>
            </Button>
          ) : (
            <Button
              type="link"
              href={`/seller-product/${id}`}
              className=" "
              style={{ textDecoration: "none" }}
              key={id}
            >
              <img
                src={`../images/${image[0]}`}
                alt={`${image[0]}`}
                className="img-fluid product-img mb-4"
              />
              <div className="product-name mb-1">
                <h4 style={{ height: 45 }}>{titleShorten(name, 50, " ")}</h4>
              </div>
              <p>{categories.name}</p>
              <h4>Rp. {formatPrice(price)}</h4>
            </Button>
          )}
        </div>
      </div>

      {/* <ModalStock productId={id} /> */}
    </>
  );
}

export default ProductItem;
