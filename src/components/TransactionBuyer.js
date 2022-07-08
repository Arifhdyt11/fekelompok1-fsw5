import Button from "elements/Button";
import { formatDate } from "utils/defaultFormat";

export default function TransactionBuyer({
  id,
  price,
  status,
  productSizes,
  updatedAt,
}) {
  return (
    <>
      <div className="card is-block ms-auto p-4 mb-3" key={id}>
        <h5 className="d-flex flex-row-reverse me-4 mb-4">
          {formatDate(updatedAt, "full")}
        </h5>
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
                  <h5>Penawaran Product</h5>
                  <h4>{productSizes.products.name}</h4>
                </div>
                <div className="d-flex justify-content-start">
                  <h5 className="me-3 align-self-center">Size : </h5>
                  <h4>{productSizes.sizes.size}</h4>
                </div>
                <div className="d-flex justify-content-start mb-4 mb-md-0">
                  <div className="me-auto">
                    <h5>Harga Awal</h5>
                    {status === "cancel" ? (
                      <h4>Rp. {productSizes.products.price}</h4>
                    ) : (
                      <h4>
                        <s>Rp. {productSizes.products.price}</s>
                      </h4>
                    )}
                  </div>
                  <div className="me-auto">
                    <h5>Ditawar</h5>

                    {status === "cancel" ? (
                      <s style={{ color: "#dc3545" }}>
                        <h4 style={{ color: "#1abc9c", fontWeight: "500" }}>
                          Rp. {price}
                        </h4>
                      </s>
                    ) : (
                      <h4 style={{ color: "#1abc9c", fontWeight: "500" }}>
                        Rp. {price}
                      </h4>
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
                <h4>{productSizes.products.userAsSeller.name}</h4>
                <p>{productSizes.products.userAsSeller.city}</p>
              </div>
            </div>

            {status === "success" ? (
              <h4 className="text-center" style={{ color: "#198754" }}>
                Success
              </h4>
            ) : status === "pending" ? (
              <h4 className="text-center" style={{ color: "#ffc107" }}>
                Pending
              </h4>
            ) : (
              <h4 className="text-center" style={{ color: "#dc3545" }}>
                Penawaran Ditolak
              </h4>
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
              <h5 className="text-center">
                Maaf, Product Yang Ditawarkan Ditolak Penjual. Silahkan Ajukan
                Lagi Penawaran
              </h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
