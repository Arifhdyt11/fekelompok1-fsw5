import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { formatPrice } from "utils/defaultFormat";

import Button from "elements/Button";
import ModalNegoBuyer from "./ModalNegoBuyer";
import { handleHeaderSwal } from "utils/sweetAlert";

import {
  deleteProduct,
  getProductIdSeller,
  updateProduct,
} from "store/actions/productAction";
import {
  addWishlist,
  deleteWishlist,
  getListWishlistBuyer,
  getListWishlistSeller,
} from "store/actions/wishlistAction";
import { getListTransactionBuyer } from "store/actions/transactionAction";

function CheckButton({
  id,
  getProductIdResult,
  getProductIdSellerResult,
  getProductIdSellerLoading,
}) {
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);

  const {
    updateProductResult,
    updateProductLoading,
    deleteProductResult,
    deleteProductLoading,
  } = useSelector((state) => state.ProductReducer);

  const {
    getListWishlistBuyerResult,
    getListWishlistBuyerLoading,
    getListWishlistBuyerError,

    addWishlistResult,
    addWishlistLoading,

    deleteWishlistResult,
    deleteWishlistLoading,
  } = useSelector((state) => state.WishlistReducer);

  const {
    getListTransactionBuyerResult,
    getListTransactionBuyerLoading,

    addTransactionResult,
    addTransactionLoading,
  } = useSelector((state) => state.TransactionReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (user.data.role === "BUYER") {
        if (addWishlistResult) {
          dispatch(getListWishlistBuyer());
        }
      } else {
        dispatch(getListWishlistSeller());
      }
    }
  }, [addWishlistResult, , dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user.data.role === "BUYER") {
        if (deleteWishlistResult) {
          dispatch(getListWishlistBuyer());
        }
      }
    }
  }, [deleteWishlistResult, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user.data.role === "BUYER") {
        dispatch(getListWishlistBuyer());
        dispatch(getListTransactionBuyer());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user.data.role === "BUYER") {
        if (addTransactionResult) {
          dispatch(getListTransactionBuyer());
        }
      }
    }
  }, [addTransactionResult, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (updateProductResult) {
        dispatch(getProductIdSeller(id));
      }
    }
  }, [updateProductResult, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (deleteProductResult) {
        dispatch(getProductIdSeller(id));
      }
    }
  }, [deleteProductResult, dispatch]);

  const productId = parseInt(id);

  const location = useLocation();

  if (location.state) {
    var { item } = location.state;
  }

  if (getListWishlistBuyerResult) {
    var wishlistId = getListWishlistBuyerResult.data
      .filter((item) => item.productId === productId)
      .map((item) => {
        return item.id;
      });
  }

  const handleDeleteProduct = () => {
    handleHeaderSwal(
      "Delete Product",
      "Apakah anda yakin ingin menghapus product ini ?",
      "warning",
      true,
      "Ya, Delete Product!"
    ).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
      }
    });
  };

  const handleTerbitkan = () => {
    handleHeaderSwal(
      "Terbitkan Product",
      "Apakah anda yakin ingin menerbitkan product ini ?",
      "warning",
      true,
      "Ya, Terbitkan Product!"
    ).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateProduct({
            id: id,
            image: getProductIdSellerResult.image,
            name: getProductIdSellerResult.name,
            price: getProductIdSellerResult.price,
            description: getProductIdSellerResult.description,
            categoryId: getProductIdSellerResult.categoryId,
            status: "published",
          })
        );
      }
    });
  };

  if (isAuthenticated) {
    if (user.data.role === "SELLER") {
      return (
        <>
          {updateProductLoading ? (
            <Button
              className="btn mt-3 ms-auto py-2"
              isSecondary
              hasShadow
              isBlock
              isLoading
            ></Button>
          ) : getProductIdSellerLoading ? (
            <Button
              className="btn mt-3 ms-auto py-2"
              isSecondary
              hasShadow
              isBlock
              isLoading
            ></Button>
          ) : getProductIdSellerResult ? (
            getProductIdSellerResult.status === "published" ? (
              <Button
                className="btn mt-3 ms-auto py-2"
                isSecondary
                hasShadow
                isBlock
                isDisabled
              >
                Published
                <i
                  className="fa-solid fa-check fa-lg ms-4"
                  style={{ color: "#1abc9c" }}
                ></i>
              </Button>
            ) : (
              <Button
                className="btn mt-3 ms-auto py-2"
                isPrimary
                hasShadow
                isBlock
                onClick={handleTerbitkan}
              >
                Terbitkan
              </Button>
            )
          ) : (
            ""
          )}

          {deleteProductLoading ? (
            <>
              <Button
                className="btn btn-warning mt-3 ms-auto  py-2"
                hasShadow
                isBlock
                isLoading
              ></Button>
              <Button
                className="btn btn-danger mt-3 ms-auto py-2"
                hasShadow
                isBlock
                isLoading
              ></Button>
            </>
          ) : getProductIdSellerLoading ? (
            <>
              <Button
                className="btn btn-warning mt-3 ms-auto  py-2"
                hasShadow
                isBlock
                isLoading
              ></Button>
              <Button
                className="btn btn-danger mt-3 ms-auto py-2"
                hasShadow
                isBlock
                isLoading
              ></Button>
            </>
          ) : getProductIdSellerResult ? (
            <>
              <Link
                to={`/update-product/${id}`}
                state={{
                  getProductIdSellerResult: { getProductIdSellerResult },
                }}
              >
                <Button
                  className="btn btn-warning mt-3 ms-auto  py-2"
                  hasShadow
                  isBlock
                >
                  Edit
                </Button>
              </Link>
              <Button
                className="btn btn-danger mt-3 ms-auto py-2"
                hasShadow
                isBlock
                onClick={handleDeleteProduct}
              >
                Delete
              </Button>
            </>
          ) : (
            ""
          )}
        </>
      );
    } else {
      return (
        <>
          {/* BUTTON BUAT TRANSAKSI */}

          {getProductIdResult ? ( //Load Modal If Product Detect
            <ModalNegoBuyer dataProduct={getProductIdResult} item={item} />
          ) : (
            ""
          )}
          {!item ? (
            <button
              type="button"
              className="btn mt-3 ms-auto py-2 btn-warning is-block btn-shadow"
              style={{ cursor: "context-menu" }}
            >
              Please Choose Size
            </button>
          ) : user.data.name === null ||
            user.data.city === null ||
            user.data.phone === null ? (
            <Button
              className="btn mt-3 ms-auto py-2 btn-warning"
              isBlock
              type="link"
              href="/profile"
            >
              Please Update Profile!!
            </Button>
          ) : addTransactionLoading ? (
            <Button
              className="btn mt-3 ms-auto py-2"
              isPrimary
              isLoading
              hasShadow
              isBlock
            ></Button>
          ) : getListTransactionBuyerLoading ? (
            <Button
              className="btn mt-3 ms-auto py-2"
              isPrimary
              isLoading
              hasShadow
              isBlock
            ></Button>
          ) : getListTransactionBuyerResult ? (
            getListTransactionBuyerResult.data.filter(
              (data) =>
                data.productsizeId === item.id &&
                (data.status === "pending" || data.status === "process")
            ).length === 0 ? (
              <button
                type="button"
                className="btn mt-3 ms-auto py-2 btn-primary is-block btn-shadow "
                data-bs-toggle="modal"
                data-bs-target="#modalInfoPenawar"
              >
                Tertarik dan Nego
              </button>
            ) : getListTransactionBuyerResult.data.filter(
                (data) =>
                  data.productsizeId === item.id && data.status === "pending"
              ).length === 0 ? (
              <Button
                className="btn mt-3 ms-auto py-2 btn-warning"
                isBlock
                style={{ cursor: "context-menu" }}
              >
                Transaksi Sedang Dalam Proses
              </Button>
            ) : (
              <Button
                className="btn mt-3 ms-auto py-2 btn-warning"
                isBlock
                style={{ cursor: "context-menu" }}
              >
                Menunggu Respon Penjual
              </Button>
            )
          ) : (
            ""
          )}

          {addWishlistLoading || deleteWishlistLoading ? (
            <Button
              className="btn mt-3 ms-auto py-2"
              isThird
              hasShadow
              isBlock
              isLoading
            ></Button>
          ) : getListWishlistBuyerLoading ? (
            <Button
              className="btn mt-3 ms-auto py-2"
              isThird
              hasShadow
              isBlock
              isLoading
            ></Button>
          ) : getListWishlistBuyerResult ? ( //BUAT BUTTON WISHLIST
            getListWishlistBuyerResult.data.filter(
              (item) => item.productId === productId
            ).length === 0 ? (
              <Button
                className="btn mt-3 ms-auto py-2"
                isThird
                hasShadow
                isBlock
                onClick={() =>
                  dispatch(
                    addWishlist({
                      userId: user.data.id,
                      productId: productId,
                    })
                  )
                }
              >
                Tambahkan Ke Wishlist
              </Button>
            ) : (
              <>
                <Button
                  className="btn btn-outline-danger ms-auto py-2 mt-3"
                  hasShadow
                  isBlock
                  onClick={() => dispatch(deleteWishlist(wishlistId))}
                >
                  Remove From Wishlist
                  <i className="fa-solid fa-trash fa-md ms-4"></i>
                </Button>
              </>
            )
          ) : (
            <p className="mt-3">
              {getListWishlistBuyerError ? getListWishlistBuyerError : ""}
            </p>
          )}
        </>
      );
    }
  } else {
    return (
      <Button
        className="btn mt-3 ms-auto py-2"
        isPrimary
        hasShadow
        isBlock
        type="link"
        href="/login"
      >
        Login Untuk Transaksi
      </Button>
    );
  }
}

export default function ActionDetail({ id }) {
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);

  const {
    getProductIdResult,
    getProductIdLoading,
    getProductIdError,

    getProductIdSellerResult,
    getProductIdSellerLoading,
    getProductIdSellerError,
  } = useSelector((state) => state.ProductReducer);
  return (
    <div className="card is-block ms-auto p-4">
      <div className="d-flex justify-content-start mb-4">
        <img
          className="seller-image me-3"
          src={
            isAuthenticated
              ? user.data.role === "SELLER"
                ? getProductIdSellerResult
                  ? getProductIdSellerResult.userAsSeller.image
                  : ""
                : getProductIdResult
                ? getProductIdResult.userAsSeller.image
                : ""
              : getProductIdResult
              ? getProductIdResult.userAsSeller.image
              : ""
          }
          alt=""
        />
        <div>
          {isAuthenticated ? (
            user.data.role === "SELLER" ? ( //SELLER
              getProductIdSellerResult ? (
                <>
                  <h4>{getProductIdSellerResult.userAsSeller.name}</h4>
                  <p>{getProductIdSellerResult.userAsSeller.city}</p>
                </>
              ) : (
                <Button isLoading></Button>
              )
            ) : getProductIdResult ? ( //BUYER
              <>
                <h4>{getProductIdResult.userAsSeller.name}</h4>
                <p>{getProductIdResult.userAsSeller.city}</p>
              </>
            ) : (
              ""
            )
          ) : getProductIdResult ? ( //NOT LOGGED IN
            <>
              <h4>{getProductIdResult.userAsSeller.name}</h4>
              <p>{getProductIdResult.userAsSeller.city}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <h4>Harga</h4>
      {isAuthenticated ? (
        user.data.role === "SELLER" ? (
          getProductIdSellerResult ? ( //SELLER
            <h3>Rp. {formatPrice(getProductIdSellerResult.price)}</h3>
          ) : getProductIdSellerLoading ? (
            <Button isLoading></Button>
          ) : (
            <p>
              {getProductIdSellerError
                ? getProductIdSellerError
                : "Data Kosong"}
            </p>
          )
        ) : getProductIdResult ? ( //BUYER
          <h3>Rp. {formatPrice(getProductIdResult.price)}</h3>
        ) : getProductIdLoading ? (
          <Button isLoading></Button>
        ) : (
          <p>{getProductIdError ? getProductIdError : "Data Kosong"}</p>
        )
      ) : getProductIdResult ? ( //NOT LOGGED IN
        <h3>Rp. {formatPrice(getProductIdResult.price)}</h3>
      ) : getProductIdLoading ? (
        <Button isLoading></Button>
      ) : (
        <p>{getProductIdError ? getProductIdError : "Data Kosong"}</p>
      )}
      <CheckButton
        id={id}
        getProductIdSellerResult={getProductIdSellerResult}
        getProductIdResult={getProductIdResult}
        getProductIdSellerLoading={getProductIdSellerLoading}
      />
    </div>
  );
}
