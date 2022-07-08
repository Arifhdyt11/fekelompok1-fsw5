import Button from "elements/Button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getTransactionIdSeller,
  updateTransactionSeller,
} from "store/actions/transactionAction";
import { formatDate } from "utils/defaultFormat";
import ModalTransactionSeller from "./ModalTransactionSeller";

function BuyerInfo({ userAsBuyer }) {
  return (
    <div className="card is-block p-4">
      <div className="d-flex justify-content-start">
        <img
          className="seller-image me-4"
          src={userAsBuyer.image}
          alt="BuyerImage"
        />
        <div>
          <h4>
            {userAsBuyer.name}
            <label className="customerTag mt-3 mt-md-0 ms-1">Pembeli</label>
          </h4>
          <p>{userAsBuyer.city}</p>
        </div>
      </div>
    </div>
  );
}

function ProductInfo({
  id,
  productSizes,
  price,
  status,
  createdAt,
  userAsBuyer,
}) {
  const dispatch = useDispatch();
  return (
    <div className="mt-4 mb-5">
      <div>
        <div className="mb-3 mt-5">
          <h3>Daftar Produkmu yang Ditawar</h3>
        </div>
        {productSizes.products ? (
          <div className="card is-block ms-auto p-4">
            <div className="row">
              <div className="col-lg-2 col-sm-12 align-self-center text-center">
                <img
                  className="img-fluid mb-lg-0 mb-4"
                  src={productSizes.products.image[0]}
                  alt=""
                />
              </div>
              <div className="col-lg-10 col-sm-12 ps-5">
                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <h5>Penawaran Product</h5>
                    <p>{formatDate(createdAt, "full")}</p>
                  </div>
                  <h4>{productSizes.products.name}</h4>
                </div>
                <div className="d-flex justify-content-start mb-3">
                  <div className="me-auto">
                    <h5>Size</h5>
                    <h4>{productSizes.sizes.size}</h4>
                  </div>
                  <div className="me-auto">
                    <h5>Harga Awal</h5>
                    <h4>
                      <s>Rp. {productSizes.products.price}</s>
                    </h4>
                  </div>
                  <div className="me-auto">
                    <h5>Ditawar</h5>
                    <h4>Rp. {price}</h4>
                  </div>
                  <div className="me-auto">
                    <h5>Status</h5>

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
                        Cancel
                      </h4>
                    )}
                  </div>
                </div>
                {status === "success" ? (
                  <div className="d-flex flex-row-reverse">
                    <Button
                      className="btn btn-primary mx-2 btn-has-radius"
                      style={{ width: "400px" }}
                      isPrimary
                      hasShadow
                      isExternal
                      type="link"
                      href={`https://wa.me/${userAsBuyer.phone}`}
                    >
                      Hubungi
                      <i className="fa-brands fa-whatsapp ms-2"></i>
                    </Button>
                  </div>
                ) : status === "pending" ? (
                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn btn-secondary mx-2 "
                      isBlock
                      hasRadius
                      onClick={() =>
                        dispatch(
                          updateTransactionSeller({
                            transactionId: id,
                            status: "cancel",
                          })
                        )
                      }
                    >
                      Tolak
                    </Button>
                    <button
                      type="button"
                      className="btn btn-primary mx-2 is-block btn-has-radius"
                      data-bs-toggle="modal"
                      data-bs-target="#modalInfoPenawar"
                    >
                      Terima
                    </button>
                    <ModalTransactionSeller
                      id={id}
                      dataProduct={productSizes.products}
                      price={price}
                      createdAt={createdAt}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default function TransactionDetailSeller() {
  const {
    getTransactionIdSellerResult,
    getTransactionIdSellerLoading,
    getTransactionIdSellerError,
  } = useSelector((state) => state.TransactionReducer);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionIdSeller(id));
  }, [dispatch]);

  // console.log(getTransactionIdSellerResult);
  return (
    <section className="container">
      {getTransactionIdSellerResult ? (
        <>
          <BuyerInfo {...getTransactionIdSellerResult.data[0]} />
          <ProductInfo {...getTransactionIdSellerResult.data[0]} />
        </>
      ) : (
        ""
      )}
    </section>
  );
}
