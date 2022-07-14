import ProductList from "./ProductList";
import Wishlist from "./WishslistSeller";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProductSeller } from "store/actions/productAction";
import { getListWishlistSeller } from "store/actions/wishlistAction";

import Button from "elements/Button";
import DraftProduct from "./DraftProduct";
function ProductBody() {
  const { user, accessToken } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  //--------------------TOTAL PRODUCT--------------
  const { getListProductSellerResult } = useSelector(
    (state) => state.ProductReducer
  );
  useEffect(() => {
    dispatch(getListProductSeller(accessToken));
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

  //------------------TOTAL WISHLIST------------------
  const sellerId = user.data.id;
  const { getListWishlistSellerResult } = useSelector(
    (state) => state.WishlistReducer
  );
  useEffect(() => {
    dispatch(getListWishlistSeller(sellerId, accessToken));
  }, [dispatch]);

  if (getListWishlistSellerResult) {
    var countWishlist = getListWishlistSellerResult.data.length;
  }

  //--------------------------------------------------------------

  const [total, setTotal] = useState(null);
  const [draft, setDraft] = useState("");
  const [wishlist, setWishlist] = useState("");

  const [show, setShow] = useState(<ProductList />);
  const handleShow = (itShow) => {
    if (itShow === "All") {
      setShow(<ProductList />);
      setTotal(countProduct);
      setDraft("");
      setWishlist("");
    }
    if (itShow === "Draft") {
      setShow(<DraftProduct />);
      setTotal("");
      setDraft(countDraft);
      setWishlist("");
    }
    if (itShow === "Diminati") {
      setShow(<Wishlist />);
      setTotal("");
      setDraft("");
      setWishlist(countWishlist);
    }
  };

  return (
    <div className="row  my-4">
      <div className="col-lg-3 col-md-4 col-12">
        <div className="section-sidebar my-2">
          <h5>Categories </h5>
          <ul className="list-group">
            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
              onClick={() => handleShow("All")}
            >
              <div className="icon-list">
                <i className="fa-regular fa-cube fa-xs item-icon"></i>Semua
                Produk
              </div>
              <span className="badge bg-primary">
                {total === null ? countProduct : total}
              </span>
            </li>

            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
              onClick={() => handleShow("Draft")}
            >
              <div className="icon-list">
                <i className="fa-regular fa-heart fa-xs item-icon"></i>Draft
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
              <span className="badge bg-primary">{wishlist}</span>
            </li>
            <Button
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
              type="link"
              href="/transaction"
            >
              <div className="icon-list">
                <i className="fa-solid fa-dollar-sign fa-xs item-icon"></i>
                Terjual
              </div>
            </Button>
          </ul>
        </div>
      </div>
      {show}
    </div>
  );
}

export default ProductBody;
