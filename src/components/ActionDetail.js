import { useDispatch, useSelector } from "react-redux";
import SellerImg from "assets/images/seller-1.png";
import Button from "elements/Button";
import { formatPrice } from "utils/defaultFormat";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { deleteProduct } from "store/actions/productAction";
import {
  addWishlist,
  getListWishlistBuyer,
} from "store/actions/wishlistAction";

function CheckButton({ id, getProductIdResult }) {
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.AuthReducer
  );
  const {
    getListWishlistBuyerResult,
    getListWishlistBuyerLoading,
    getListWishlistBuyerError,

    addWishlistResult,
  } = useSelector((state) => state.WishlistReducer);

  const buyerId = user.data.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (addWishlistResult) {
      dispatch(getListWishlistBuyer(buyerId, accessToken));
    }
  }, [addWishlistResult, dispatch]);

  useEffect(() => {
    if (user.data.role === "BUYER") {
      dispatch(getListWishlistBuyer(buyerId, accessToken));
    }
  }, [dispatch]);

  const userId = user.data.id;
  const sizeId = 5;
  const productId = parseInt(id);

  if (isAuthenticated) {
    if (user.data.role === "SELLER") {
      return (
        <>
          <Button className="btn mt-3 ms-auto py-2" isPrimary hasShadow isBlock>
            Terbitkan
          </Button>
          <Link
            to={`/update-product/${id}`}
            state={{ getProductIdResult: { getProductIdResult } }}
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
          <Button className="btn mt-3 ms-auto py-2" isPrimary hasShadow isBlock>
            Tertarik dan Nego
          </Button>
          {getListWishlistBuyerResult ? (
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
                      userId: userId,
                      productId: productId,
                    })
                  )
                }
              >
                Tambahkan Ke Wishlist
              </Button>
            ) : (
              <Button
                className="btn mt-3 ms-auto py-2"
                isSecondary
                hasShadow
                isBlock
                isDisabled
              >
                Already on Wishlist
                <i
                  className="fa-solid fa-check fa-lg ms-4"
                  style={{ color: "#1abc9c" }}
                ></i>
              </Button>
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
  const { user } = useSelector((state) => state.AuthReducer);

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
          {user.data.role === "SELLER" ? (
            getProductIdSellerResult ? (
              <>
                <h4>{getProductIdSellerResult.userAsSeller.name}</h4>
                <p>{getProductIdSellerResult.userAsSeller.city}</p>
              </>
            ) : (
              ""
            )
          ) : getProductIdResult ? (
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
      {user.data.role === "SELLER" ? (
        getProductIdSellerResult ? (
          <h3>Rp. {formatPrice(getProductIdSellerResult.price)}</h3>
        ) : getProductIdSellerLoading ? (
          <h3>Loading....</h3>
        ) : (
          <p>
            {getProductIdSellerError ? getProductIdSellerError : "Data Kosong"}
          </p>
        )
      ) : getProductIdResult ? (
        <h3>Rp. {formatPrice(getProductIdResult.price)}</h3>
      ) : getProductIdLoading ? (
        <h3>Loading....</h3>
      ) : (
        <p>{getProductIdError ? getProductIdError : "Data Kosong"}</p>
      )}
      <CheckButton id={id} getProductIdResult={getProductIdResult} />
    </div>
  );
}
