import Button from "elements/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { logout } from "store/actions/authAction";
import { getListProduct } from "store/actions/productAction";
import BrandIcon from "./IconText";
import NavbarDropdown from "./NavbarDropdown";
import Notification from "./Notification";

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
            <Link to="/profile">
              <button
                type="button"
                className="dropdown-item"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <i className="fa-duotone fa-gears me-3"></i>Edit Profile
              </button>
            </Link>

            <Button className="dropdown-item" type="link" href="/notifikasi">
              <i className="fas fa-bell fa-lg me-3"></i>Notifikasi
            </Button>
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
                <Link to="/wishlist">
                  <button
                    type="button"
                    className="dropdown-item"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    <i className="fa-duotone fa-cart-shopping me-3"></i>Wishlist
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/history">
                  <button
                    type="button"
                    className="dropdown-item"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    <i className="fa-duotone fa-arrows-repeat me-3"></i>History
                    Transaksi
                  </button>
                </Link>
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
      <Link to="/login">
        <button
          type="button"
          className="btn btn-primary ms-auto px-3 py-2 btn-shadow is-block"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          Masuk
        </button>
      </Link>
    );
  }
}

export default function Navbar() {
  const { isAuthenticated, user, error } = useSelector(
    (state) => state.AuthReducer
  );

  return (
    <>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <BrandIcon />
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <CheckLoginMobile
            isAuthenticated={isAuthenticated}
            user={user}
            error={error}
          />
        </div>
      </div>

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
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <CheckLogin isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </nav>
    </>
  );
}
