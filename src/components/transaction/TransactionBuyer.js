import Button from "elements/Button";
import { formatDate, formatPrice } from "utils/defaultFormat";

export default function TransactionBuyer({
  id,
  priceBid,
  status,
  productSizes,
  updatedAt,
}) {
  return (
    <>
      <div className="card is-block ms-auto p-4 mb-3" key={id}>
        <p className="d-flex flex-row-reverse me-4 mb-4">
          {formatDate(updatedAt, "full")}
        </p>
        <div className="row">
          <div className="col-lg-8 col-md-9 col-sm-12">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-sm-12  text-center">
                <img
                  className="img-fluid mb-lg-0 mb-4"
                  src={productSizes.products.image[0]}
                  alt="seller"
                />
              </div>
              <div className="col-lg-8 col-md-7 col-sm-12 align-self-center ">
                <div className="mb-4">
                  <h6>Penawaran Product</h6>
                  <h5>{productSizes.products.name}</h5>
                </div>
                <div className="d-flex justify-content-start">
                  <h6 className="me-3 align-self-center">Size : </h6>
                  <h5>{productSizes.sizes.size}</h5>
                </div>
                <div className="d-flex justify-content-start mb-4 mb-md-0">
                  <div className="me-auto">
                    <h6>Harga Awal</h6>
                    {status === "cancel" ? (
                      <h5>Rp. {formatPrice(productSizes.products.price)}</h5>
                    ) : (
                      <h5>
                        <s>Rp. {formatPrice(productSizes.products.price)}</s>
                      </h5>
                    )}
                  </div>
                  <div className="me-auto">
                    <h6>Ditawar</h6>

                    {status === "cancel" ? (
                      <s style={{ color: "#dc3545" }}>
                        <h5 style={{ color: "#1abc9c", fontWeight: "500" }}>
                          Rp. {formatPrice(priceBid)}
                        </h5>
                      </s>
                    ) : (
                      <h5 style={{ color: "#1abc9c", fontWeight: "500" }}>
                        Rp. {formatPrice(priceBid)}
                      </h5>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-12 align-self-center  ps-md-3">
            <div className="d-flex justify-content-start mb-3">
              <img
                className="seller-image me-4"
                src={productSizes.products.userAsSeller.image}
                alt=""
              />
              <div>
                <h5>{productSizes.products.userAsSeller.name}</h5>
                <p>{productSizes.products.userAsSeller.city}</p>
              </div>
            </div>

            {status === "success" ? (
              <h5 className="text-center" style={{ color: "#198754" }}>
                Success
              </h5>
            ) : status === "pending" ? (
              <h5 className="text-center" style={{ color: "#ffc107" }}>
                Pending
              </h5>
            ) : (
              <h5 className="text-center" style={{ color: "#dc3545" }}>
                Penawaran Ditolak
              </h5>
            )}

            {status === "success" ? (
              <Button
                className="btn btn-success mt-1 py-2 mx-0"
                isBlock
                hasRadius
                hasShadow
                isExternal
                type="link"
                href="https://wa.me/628974233275"
              >
                Hubungi Penjual
                <i className="fa-brands fa-whatsapp ms-3"></i>
              </Button>
            ) : status === "pending" ? (
              <Button
                className="btn btn-warning btn-no-hover mt-1 py-2 mx-0"
                hasShadow
                isBlock
                hasRadius
                style={{ cursor: "context-menu" }}
              >
                Menunggu Response Penjual
              </Button>
            ) : (
              <p className="text-center">
                Maaf, Product Yang Ditawarkan Ditolak Penjual. Silahkan Ajukan
                Lagi Penawaran
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
