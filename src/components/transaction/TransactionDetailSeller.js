import CardLoading from "components/CardLoading";
import Button from "elements/Button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getTransactionIdSeller,
  updateTransactionSeller,
} from "store/actions/transactionAction";
import Swal from "sweetalert2";
import { formatDate, formatPrice } from "utils/defaultFormat";
import ModalStatusSeller from "./ModalStatus";
import ModalTransactionSeller from "./ModalTransactionSeller";

function BuyerInfo({ userAsBuyer }) {
  return (
    <>
      <div className="container mb-4">
        <Button
          className="btn arrow-back d-flex justify-content-start p-0"
          nonStyle
          type="link"
          href="/transaction"
        >
          <i className="fa-solid fa-arrow-left-long fa-lg align-self-center me-4 align-self-center"></i>
          <h6 className="mb-0 ">Back to Transaction</h6>
        </Button>
      </div>
      <div className="card is-block p-4">
        <div className="d-flex justify-content-start">
          <img
            className="seller-image me-4 align-self-center"
            src={userAsBuyer.image}
            alt="BuyerImage"
          />
          <div>
            <h5>
              {userAsBuyer.name}
              <label className="customerTag mt-3 mt-md-0 ms-1">Pembeli</label>
            </h5>
            <p>{userAsBuyer.city}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductInfo({
  id,
  productSizes,
  priceBid,
  status,
  createdAt,
  userAsBuyer,
}) {
  const dispatch = useDispatch();

  const handleUpdate = (status) => {
    Swal.fire({
      title: "Apakah Yakin ?",
      text: `Transaksi Akan di Rubah Menjadi ${status}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Simpan!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title:
            status === "success"
              ? "Transaksi Berhasil"
              : status === "process"
              ? "Transaksi Dalam Proses"
              : status === "cancel" || status === "reject"
              ? "Transaksi Dibatalkan"
              : "",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(
          updateTransactionSeller({
            transactionId: id,
            status: status,
          })
        );
      }
    });
  };
  return (
    <div className="mt-4 mb-5">
      <div>
        <div className="mb-3 mt-5">
          <h3>Daftar Produkmu yang Ditawar</h3>
        </div>
        {productSizes.products ? (
          <div className="card is-block ms-auto p-4">
            <p className="d-flex flex-row-reverse me-3">
              {formatDate(createdAt, "full")}
            </p>
            <div className="row">
              <div className="col-lg-2 col-sm-12 align-self-center text-center">
                <img
                  className="img-fluid mb-lg-0 p-4 p-lg-0"
                  src={productSizes.products.image[0]}
                  alt=""
                />
              </div>
              <div className="col-lg-10 col-sm-12 ps-md-5 p-0">
                <div className="mb-3">
                  <div className="d-flex justify-content-lg-between justify-content-center ">
                    <h6>Penawaran Product</h6>
                  </div>
                  <h5 className="text-center text-md-start">
                    {productSizes.products.name}
                  </h5>
                </div>
                <div className="row mb-3">
                  <div className="col-lg-2 col-md-2 text-center text-md-start">
                    <h6>Size</h6>
                    <h5>{productSizes.sizes.size}</h5>
                  </div>
                  <div className="col-lg-7 col-md-7 d-flex justify-content-between mb-3">
                    <div className="ps-3 ps-md-4">
                      <h6>Harga Awal</h6>
                      <h5>
                        <s>Rp. {formatPrice(productSizes.products.price)}</s>
                      </h5>
                    </div>
                    <div className="pe-3 pe-md-4">
                      <h6>Ditawar</h6>
                      <h5 style={{ color: "#1abc9c", fontWeight: "500" }}>
                        Rp. {formatPrice(priceBid)}
                      </h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 text-center">
                    <h6>Status</h6>

                    {status === "success" ? (
                      <h5 className="text-center" style={{ color: "#198754" }}>
                        Success
                      </h5>
                    ) : status === "process" ? (
                      <h5 className="text-center" style={{ color: "#e9c46a" }}>
                        On Process
                      </h5>
                    ) : status === "pending" ? (
                      <h5 className="text-center" style={{ color: "#ffc107" }}>
                        Pending
                      </h5>
                    ) : (
                      <h5 className="text-center" style={{ color: "#dc3545" }}>
                        Cancel
                      </h5>
                    )}
                  </div>
                </div>
                {status === "success" ? (
                  <div className="d-flex flex-row-reverse">
                    <div>
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
                    <ModalStatusSeller
                      id={id}
                      dataProduct={productSizes.products}
                      priceBid={priceBid}
                      createdAt={createdAt}
                    />
                  </div>
                ) : status === "process" ? (
                  <div className="d-flex flex-row-reverse">
                    <button
                      className="btn btn-secondary btn-has-radius"
                      style={{ width: "400px" }}
                      hasShadow
                      isExternal
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#modalStatusInfoPenawar"
                    >
                      Status
                    </button>
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

                    <ModalStatusSeller
                      id={id}
                      dataProduct={productSizes.products}
                      priceBid={priceBid}
                      createdAt={createdAt}
                    />
                  </div>
                ) : status === "pending" ? (
                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn btn-secondary mx-2 "
                      isBlock
                      hasRadius
                      onClick={() => handleUpdate("reject")}
                    >
                      Tolak
                    </Button>
                    {productSizes.stock > 0 ? (
                      <Button
                        className="btn btn-primary mx-2 "
                        isBlock
                        hasRadius
                        onClick={() => handleUpdate("process")}
                      >
                        Terima Tawaran dan Lanjut Transaksi
                      </Button>
                    ) : (
                      <h6
                        className="px-5 is-block text-center"
                        style={{ color: "red" }}
                      >
                        Tidak Bisa Terima Penawaran Karena Tidak Ada Stock
                        Product
                      </h6>
                    )}
                  </div>
                ) : status === "cancel" ? (
                  <></>
                ) : (
                  ""
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

    updateTransactionSellerResult,
    updateTransactionSellerLoading,
    updateTransactionSellerError,
  } = useSelector((state) => state.TransactionReducer);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionIdSeller(id));
  }, [dispatch]);

  useEffect(() => {
    if (updateTransactionSellerResult) {
      dispatch(getTransactionIdSeller(id));
    }
  }, [updateTransactionSellerResult]);

  // console.log(getTransactionIdSellerResult);
  return (
    <section className="container">
      {getTransactionIdSellerResult ? (
        <>
          <BuyerInfo {...getTransactionIdSellerResult.data[0]} />
          <ProductInfo {...getTransactionIdSellerResult.data[0]} />
        </>
      ) : getTransactionIdSellerLoading ? (
        <CardLoading transaction col="1" count="1" />
      ) : (
        <p>
          {getTransactionIdSellerError ? getTransactionIdSellerError : "Error"}
        </p>
      )}
    </section>
  );
}
