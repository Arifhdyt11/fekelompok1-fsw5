import ProductList from "./ProductList";
import Wishlist from "./WishslistSeller";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProductSeller } from "store/actions/productAction";
import { getListWishlistSeller } from "store/actions/wishlistAction";

import DraftProduct from "./DraftProduct";
import { io } from "socket.io-client";
import Sold from "./Sold";
import { getListTransactionSeller } from "store/actions/transactionAction";
import { getListSize } from "store/actions/sizeAction";
import { update } from "lodash";
import Button from "elements/Button";
function ProductBody() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);

  //--------------------TOTAL PRODUCT--------------
  const { getListProductSellerResult } = useSelector(
    (state) => state.ProductReducer
  );

  useEffect(() => {
    dispatch(getListProductSeller());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getListSize());
  }, [dispatch]);

  if (getListProductSellerResult) {
    var countProduct = getListProductSellerResult.data.filter(
      (item) => item.status === "published"
    ).length;
  }
  if (getListProductSellerResult) {
    var countDraft = getListProductSellerResult.data.filter(
      (item) => item.status === "draft"
    ).length;
  }

  useEffect(() => {
    if (user.data.role === "SELLER") {
      setTotal(countProduct);
    }
  }, [countProduct]);

  useEffect(() => {
    if (user.data.role === "SELLER") {
      setDraft(countDraft);
    }
  }, [countDraft]);
  //------------------TOTAL WISHLIST------------------

  const { getListWishlistSellerResult, getListWishlistSellerLoading } =
    useSelector((state) => state.WishlistReducer);
  useEffect(() => {
    dispatch(getListWishlistSeller());
  }, [dispatch]);

  if (getListWishlistSellerResult) {
    var countWishlist = getListWishlistSellerResult.data.length;
  }

  useEffect(() => {
    if (user.data.role === "SELLER") {
      setWishlist(countWishlist);
    }
  }, [countWishlist]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET);

    socket.on("connection", () => {
      if (user.data.role === "SELLER") {
        socket.on("add-wishlist", () => {
          dispatch(getListWishlistSeller());
        });
        socket.on("delete-wishlist", () => {
          dispatch(getListWishlistSeller());
        });
      }
    });
  }, [dispatch]);

  //-----------------------------TOTAL SOLD-------------------------------
  const { getListTransactionSellerResult } = useSelector(
    (state) => state.TransactionReducer
  );

  useEffect(() => {
    dispatch(getListTransactionSeller());
  }, [dispatch]);

  if (getListTransactionSellerResult) {
    var countSold = getListTransactionSellerResult.data.filter(
      (item) => item.status === "success"
    ).length;
  }

  useEffect(() => {
    if (user.data.role === "SELLER") {
      setSold(countSold);
    }
  }, [countSold]);

  useEffect(() => {
    if (user.data.role === "SELLER") {
      const socket = io(process.env.REACT_APP_SOCKET);
      socket.on("connection", () => {
        socket.on("update-transaction", () => {
          dispatch(getListTransactionSeller());
        });
      });
    }
  }, [dispatch]);

  // --------------------------------------------------------------

  const [total, setTotal] = useState(null);
  const [draft, setDraft] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [sold, setSold] = useState(null);

  const [show, setShow] = useState(<ProductList />);

  const handleShow = (itShow) => {
    if (itShow === "All") {
      setShow(<ProductList />);
      setTotal(countProduct);
    }
    if (itShow === "Draft") {
      setShow(<DraftProduct />);

      setDraft(countDraft);
    }
    if (itShow === "Diminati") {
      setShow(<Wishlist />);
      setWishlist(countWishlist);
    }
    if (itShow === "Terjual") {
      setShow(<Sold />);
      setSold(countSold);
    }
  };

  return (
    <div className="row  my-4">
      <div className="col-lg-3 col-md-4 col-12">
        <div className="section-sidebar my-2">
          <h5>Menu </h5>
          <ul className="list-group">
            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
              onClick={() => handleShow("All")}
            >
              <div className="icon-list">
                <i className="fa-regular fa-cube fa-xs item-icon"></i>Semua
                Produk
              </div>
              <span className="badge bg-primary">{total}</span>
            </li>

            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
              onClick={() => handleShow("Draft")}
            >
              <div className="icon-list">
                <i className="fa-solid fa-book-blank fa-xs item-icon"></i>Draft
              </div>
              <span className="badge bg-primary">{draft}</span>
            </li>

            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
              onClick={() => handleShow("Diminati")}
            >
              <div className="icon-list">
                <i className="fa-regular fa-heart fa-xs item-icon"></i>Diminati
              </div>
              <span className="badge bg-primary">
                {getListWishlistSellerLoading ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  wishlist
                )}
              </span>
            </li>
            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
              onClick={() => handleShow("Terjual")}
            >
              <div className="icon-list">
                <i className="fa-solid fa-dollar-sign fa-xs item-icon"></i>
                Terjual
              </div>
              <span className="badge bg-primary">{sold}</span>
            </li>
          </ul>
        </div>
      </div>
      {show}
    </div>
  );
}

export default ProductBody;
