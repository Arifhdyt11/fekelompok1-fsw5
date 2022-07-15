import Button from "elements/Button";
import { formatDate, formatPrice } from "utils/defaultFormat";

export default function TransactionSeller({
  id,
  priceBid,
  status,
  productSizes,
  userAsBuyer,
  updatedAt,
}) {
  if (productSizes.products) {
    console.log(productSizes.products.image[0]);
  }

  return (
    <>
      <div className="card is-block ms-auto p-4 mb-3" key={id}>
        <p className="d-flex flex-row-reverse me-4 mb-4">
          {formatDate(updatedAt, "full")}
        </p>
        <div className="row">
          {productSizes.products ? (
            <div className="col-lg-8 col-md-9 col-sm-12">
              <div className="row">
                <div className="col-lg-4 col-md-5 col-sm-12  text-center">
                  <img
                    className="img-fluid mb-lg-0 mb-4"
                    src={
                      productSizes.products.image
                        ? productSizes.products.image[0]
                        : ""
                    }
                    alt="seller"
                  />
                </div>
                <div className="col-lg-8 col-md-7 col-sm-12 align-self-center ">
                  <div className="mb-4 text-center text-md-start">
                    <h6>Penawaran Product</h6>
                    <h5>{productSizes.products.name}</h5>
                  </div>
                  <div className="d-flex justify-content-lg-start justify-content-center mb-3">
                    <h6 className="me-3 align-self-center">Size : </h6>
                    <h5>{productSizes.sizes.size}</h5>
                  </div>
                  <div className="d-flex justify-content-lg-start justify-content-between mb-4 mb-md-0">
                    <div className="me-lg-auto mx-2">
                      <h6>Harga Awal</h6>
                      <h5>
                        <s>Rp. {formatPrice(productSizes.products.price)}</s>
                      </h5>
                    </div>
                    <div className="me-lg-auto mx-2">
                      <h6>Ditawar</h6>
                      <h5 style={{ color: "#1abc9c", fontWeight: "500" }}>
                        Rp. {formatPrice(priceBid)}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="col-lg-4 col-md-3 col-sm-12 align-self-center  ps-md-3">
            <div className="d-flex justify-content-start mb-3">
              <img
                className="seller-image me-4"
                src={userAsBuyer.image}
                alt=""
              />
              <div>
                <h5>{userAsBuyer.name}</h5>
                <h6>{userAsBuyer.city}</h6>
              </div>
            </div>

            {status === "success" ? (
              <h5 className="text-center" style={{ color: "#198754" }}>
                Success
              </h5>
            ) : status === "pending" || status === "perbarui" ? (
              <h5 className="text-center" style={{ color: "#ffc107" }}>
                Pending
              </h5>
            ) : (
              <h5 className="text-center" style={{ color: "#dc3545" }}>
                Cancel
              </h5>
            )}

            {status === "success" ? (
              <Button
                className="btn btn-success mt-1 py-2 mx-0"
                hasShadow
                isBlock
                hasRadius
                type="link"
                href={`/transaction/${id}`}
              >
                Check Detail
              </Button>
            ) : status === "pending" || status === "perbarui" ? (
              <Button
                className="btn btn-warning mt-1 py-2 mx-0"
                hasShadow
                isBlock
                hasRadius
                type="link"
                href={`/transaction/${id}`}
              >
                Check Detail
              </Button>
            ) : (
              <Button
                className="btn btn-danger mt-1 py-2 mx-0"
                hasShadow
                isBlock
                hasRadius
                type="link"
                href={`/transaction/${id}`}
              >
                Check Detail
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
