import ModalStock from "components/formActionProduct/ModalStock";
import Button from "elements/Button";
import { formatPrice, titleShorten } from "utils/defaultFormat";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getListSize } from "store/actions/sizeAction";
import { Fade } from "react-reveal";
function ProductItem({
  id,
  name,
  categories,
  price,
  image,
  productId,
  products,
  index,
  count,
}) {
  const { accessToken } = useSelector((state) => state.AuthReducer);
  const { getListSizeResult } = useSelector((state) => state.SizeReducer);
  const { getProductIdSellerResult } = useSelector(
    (state) => state.ProductReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListSize(accessToken));
  }, [dispatch]);

  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 ">
        <Fade bottom delay={300 * index}>
          <div className="card-product p-3 mb-4">
            {products ? (
              //Wishlist Badge
              <div className="d-md-flex flex-row-reverse">
                <span className="badge bg-primary p-2">
                  {`Diminati \xa0 : \xa0 ${count}`}
                </span>
              </div>
            ) : (
              //All Product Badge Stock
              <div className="d-md-flex flex-row-reverse">
                {getListSizeResult ? (
                  getListSizeResult.data.filter((item) => item.productId === id)
                    .length === 0 ? (
                    <span
                      className="badge bg-danger p-2 zoom"
                      data-bs-toggle="modal"
                      data-bs-target={`#modal${id}`}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-plus"> </i> Stok Kosong
                    </span>
                  ) : (
                    <span
                      className="badge bg-primary p-2 zoom"
                      data-bs-toggle="modal"
                      data-bs-target={`#modal${id}`}
                      style={{ cursor: "pointer" }}
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
              //wishlist
              <Button
                type="link"
                href={`/seller-product/${productId}`}
                className=" "
                style={{ textDecoration: "none" }}
                key={id}
              >
                <img
                  src={`${products.image[0]}`}
                  alt={`${products.image[0]}`}
                  className="img-fluid product-img mb-4"
                />
                <div className="product-name mb-1">
                  <h5 style={{ height: 45 }}>
                    {titleShorten(products.name, 40, " ")}
                  </h5>
                </div>
                <p>{products.categories.name}</p>
                <h5>Rp. {formatPrice(products.price)}</h5>
              </Button>
            ) : (
              //All Product
              <Button
                type="link"
                href={`/seller-product/${id}`}
                className=" "
                style={{ textDecoration: "none" }}
                key={id}
              >
                <img
                  src={`${image[0]}`}
                  alt={`${image[0]}`}
                  className="img-fluid product-img mb-4"
                />
                <div className="product-name mb-1">
                  <h5 style={{ height: 45 }}>{titleShorten(name, 50, " ")}</h5>
                </div>
                <p>{categories.name}</p>
                <h5>Rp. {formatPrice(price)}</h5>
              </Button>
            )}
          </div>
        </Fade>
      </div>

      <ModalStock productId={id} />
    </>
  );
}

export default ProductItem;
