import Button from "elements/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { logout } from "store/actions/authAction";
import { getListProduct } from "store/actions/productAction";
import BrandIcon from "./IconText";
import NavbarDropdown from "./NavbarDropdown";

function CheckLogin({ isAuthenticated }) {
  if (isAuthenticated) {
    return <NavbarDropdown />;
  } else {
    return (
      <Button
        className="btn ms-auto px-3 py-2"
        hasShadow
        isPrimary
        href="/login"
        type="link"
      >
        Masuk
      </Button>
    );
  }
}

function CheckLoginMobile({ isAuthenticated, user, error }) {
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const location = useLocation();
  if (isAuthenticated) {
    return (
      <>
        <ul className="navbar-nav ms-auto">
          <li>
            <h4 className="dropdown-item item">
              {user.data.name}
              <span className="span-dropdown"> as</span>
              {user.data.role === "SELLER" ? "Seller" : "Buyer"}
            </h4>
          </li>
          <hr />
          <li>
            <a className="dropdown-item" href="/profile">
              <i className="fa-duotone fa-gears me-3"></i>Edit Profile
            </a>
          </li>
          {user.data.role === "SELLER" ? (
            <li className=" mt-3">
              {location.pathname === "/" ? (
                <Button
                  type="link"
                  href="/seller"
                  className="dropdown-item text-center"
                  isPrimary
                  hasShadow
                  isBlock
                >
                  Seller Center
                </Button>
              ) : (
                ""
              )}
            </li>
          ) : (
            <>
              <li>
                <a className="dropdown-item" href="/wishlist">
                  <i className="fa-duotone fa-cart-shopping me-3"></i>Wishlist
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/history">
                  <i className="fa-duotone fa-arrows-repeat me-3"></i>History
                  Transaksi
                </a>
              </li>
            </>
          )}
          <li>
            <Button
              className="btn ms-auto mt-3"
              hasShadow
              isBlock
              isPrimary
              href="/"
              type="link"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </li>
        </ul>
      </>
    );
  } else {
    return (
      <Button
        className="btn ms-auto px-3 py-2"
        hasShadow
        isBlock
        isPrimary
        href="/login"
        type="link"
      >
        Masuk
      </Button>
    );
  }
}

export default function Navbar() {
  const { isAuthenticated, user, error } = useSelector(
    (state) => state.AuthReducer
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3">
      <div className="container">
        <BrandIcon />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <BrandIcon />
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <CheckLoginMobile
              isAuthenticated={isAuthenticated}
              user={user}
              error={error}
            />
          </div>
        </div>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <CheckLogin isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </nav>
  );
}
