import ProductList from "./ProductList";
import Wishlist from "./WishslistSeller";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProductSeller } from "store/actions/productAction";
import { getListWishlistSeller } from "store/actions/wishlistAction";
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
    var countProduct = getListProductSellerResult.data.length;
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

  const [total, setTotal] = useState(countProduct);
  const [wishlist, setWishlist] = useState(countWishlist);

  useEffect(() => {
    setTotal(countProduct);
  }, [countProduct]);

  const [show, setShow] = useState(<ProductList />);
  const handleShow = (itShow) => {
    if (itShow === "All") {
      setShow(<ProductList />);
      setTotal(countProduct);
      setWishlist("");
    }
    if (itShow === "Diminati") {
      setShow(<Wishlist />);
      setTotal("");
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
                <i className="uil uil-cube item-icon"></i> Semua Produk
              </div>
              <span className="badge bg-primary">{total}</span>
            </li>

            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"
              onClick={() => handleShow("Diminati")}
            >
              <div className="icon-list">
                <i className="uil uil-heart item-icon"></i>
                Diminati
              </div>
              <span className="badge bg-primary">{wishlist}</span>
            </li>
            <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category">
              <div className="icon-list">
                <i className="uil uil-dollar-alt item-icon"></i> Terjual
              </div>
              <span className="badge bg-primary"></span>
            </li>
          </ul>
        </div>
      </div>
      {show}
    </div>
  );
}

export default ProductBody;
