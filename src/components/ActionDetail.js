import { useDispatch, useSelector } from "react-redux";
import SellerImg from "assets/images/seller-1.png";
import Button from "elements/Button";
import { formatPrice } from "utils/defaultFormat";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { deleteProduct } from "store/actions/productAction";
import {
  addWishlist,
  deleteWishlist,
  getListWishlistBuyer,
} from "store/actions/wishlistAction";
import ModalNegoBuyer from "./ModalNegoBuyer";
import { getListTransactionBuyer } from "store/actions/transactionAction";

function CheckButton({ id, getProductIdResult, getProductIdSellerResult }) {
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.AuthReducer
  );
  // console.log(getProductIdResult);
  const {
    getListWishlistBuyerResult,
    getListWishlistBuyerLoading,
    getListWishlistBuyerError,

    addWishlistResult,
    deleteWishlistResult,
  } = useSelector((state) => state.WishlistReducer);

  const { getListTransactionBuyerResult, addTransactionResult } = useSelector(
    (state) => state.TransactionReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (addWishlistResult) {
        dispatch(getListWishlistBuyer(user.data.id, accessToken));
      }
    }
  }, [addWishlistResult, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (deleteWishlistResult) {
        dispatch(getListWishlistBuyer(user.data.id, accessToken));
      }
    }
  }, [deleteWishlistResult, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user.data.role === "BUYER") {
        dispatch(getListWishlistBuyer(user.data.id, accessToken));
        dispatch(getListTransactionBuyer());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (addTransactionResult) {
        dispatch(getListTransactionBuyer());
      }
    }
  }, [addTransactionResult, dispatch]);

  const productId = parseInt(id);

  const location = useLocation();
  if (location.state) {
    var { item } = location.state;
    // console.log(location);
  }
  // const getProductIdResult =
  // location.state.getProductIdResult.getProductIdResult;
  // console.log(item);

  if (getListWishlistBuyerResult) {
    var wishlistId = getListWishlistBuyerResult.data
      .filter((item) => item.productId === productId)
      .map((item) => {
        return item.id;
      });
  }

  console.log(item);
  // console.log(getListTransactionBuyerResult.data);

  if (isAuthenticated) {
    if (user.data.role === "SELLER") {
      return (
        <>
          <Button className="btn mt-3 ms-auto py-2" isPrimary hasShadow isBlock>
            Terbitkan
          </Button>
          <Link
            to={`/update-product/${id}`}
            state={{ getProductIdSellerResult: { getProductIdSellerResult } }}
          >
            <Button
              className="btn mt-3 ms-auto py-2"
              isSecondary
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
            onClick={() => dispatch(deleteProduct(id, accessToken))}
          >
            Delete
          </Button>
        </>
      );
    } else {
      return (
        <>
          {getProductIdResult ? (
            <ModalNegoBuyer dataProduct={getProductIdResult} item={item} />
          ) : (
            ""
          )}
          {!item ? (
            <button
              type="button"
              className="btn mt-3 ms-auto py-2 btn-warning is-block btn-has-shadow"
              style={{ cursor: "context-menu" }}
            >
              Please Choose Size
            </button>
          ) : getListTransactionBuyerResult ? (
            getListTransactionBuyerResult.data.filter(
              (data) =>
                data.productsizeId === item.id && data.status === "pending"
            ).length === 0 ? (
              <button
                type="button"
                className="btn mt-3 ms-auto py-2 btn-primary is-block btn-has-shadow "
                data-bs-toggle="modal"
                data-bs-target="#modalInfoPenawar"
              >
                Tertarik dan Nego
              </button>
            ) : (
              <Button className="btn mt-3 ms-auto py-2 btn-warning" isBlock>
                Menunggu Respon Penjual
              </Button>
            )
          ) : (
            ""
          )}
          {getListWishlistBuyerResult ? ( //BUAT BUTTON WISHLIST
            getListWishlistBuyerResult.data.filter(
              (item) => item.productId === productId
            ).length === 0 ? (
              <Button
                className="btn mt-3 ms-auto py-2"
                isSecondary
                hasShadow
                isBlock
                onClick={() =>
                  dispatch(
                    addWishlist({
                      accessToken: accessToken,
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
                <h4 className="mt-3 text-center">
                  Already On Wishlist
                  <i
                    className="fa-solid fa-check fa-lg ms-4"
                    style={{ color: "#1abc9c" }}
                  ></i>
                </h4>
                <Button
                  className="btn btn-outline-danger ms-auto py-2"
                  hasShadow
                  isBlock
                  onClick={() =>
                    dispatch(deleteWishlist(wishlistId, accessToken))
                  }
                >
                  Remove From Wishlist
                  <i className="fa-solid fa-trash fa-md ms-4"></i>
                </Button>
              </>
            )
          ) : getListWishlistBuyerLoading ? (
            <h3 className="mt-3" style={{ color: "#152c5b" }}>
              Loading...
            </h3>
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
    deleteProductResult,

    getProductIdSellerResult,
    getProductIdSellerLoading,
    getProductIdSellerError,
  } = useSelector((state) => state.ProductReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    //Biar realtime pas delete
    if (deleteProductResult) {
      alert("Data Berhasil diapus");
      window.location.href = "/seller";
    }
  }, [deleteProductResult, dispatch]);

  return (
    <div className="card is-block ms-auto p-4">
      <div className="d-flex justify-content-start mb-4">
        <img className="seller-image me-3" src={SellerImg} alt="" />
        <div>
          {isAuthenticated ? (
            user.data.role === "SELLER" ? ( //SELLER
              getProductIdSellerResult ? (
                <>
                  <h4>{getProductIdSellerResult.userAsSeller.name}</h4>
                  <p>{getProductIdSellerResult.userAsSeller.city}</p>
                </>
              ) : (
                ""
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
            <h3>Loading....</h3>
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
          <h3>Loading....</h3>
        ) : (
          <p>{getProductIdError ? getProductIdError : "Data Kosong"}</p>
        )
      ) : getProductIdResult ? ( //NOT LOGGED IN
        <h3>Rp. {formatPrice(getProductIdResult.price)}</h3>
      ) : getProductIdLoading ? (
        <h3>Loading....</h3>
      ) : (
        <p>{getProductIdError ? getProductIdError : "Data Kosong"}</p>
      )}
      <CheckButton
        id={id}
        getProductIdSellerResult={getProductIdSellerResult}
        getProductIdResult={getProductIdResult}
      />
    </div>
  );
}
