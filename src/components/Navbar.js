import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { logout } from "store/actions/authAction";
import {
  getNotificationBuyer,
  getNotificationSeller,
} from "store/actions/notificationAction";
import { getListProduct } from "store/actions/productAction";
import BrandIcon from "./IconText";
import NavbarDropdown from "./NavbarDropdown";
import Button from "elements/Button";
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
  const {
    getNotificationBuyerResult,
    getNotificationBuyerLoading,

    getNotificationSellerResult,
    getNotificationSellerLoading,
  } = useSelector((state) => state.NotificationReducer);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user.data.role === "SELLER") {
        dispatch(getNotificationSeller);
      } else {
        dispatch(getNotificationBuyer);
      }
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };
  if (isAuthenticated) {
    return (
      <>
        <ul className="navbar-nav ms-auto">
          <li>
            <h4 data-testid="user-name" className="dropdown-item item">
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
          </li>
          <li>
            <Link to="/notifications">
              <button
                type="button"
                className="dropdown-item"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                {isAuthenticated ? (
                  user.data.role === "SELLER" ? (
                    getNotificationSellerResult ? (
                      getNotificationSellerResult.data.filter(
                        (item) => item.isReadSeller === false
                      ).length > 0 ? (
                        <>
                          <i
                            className="fas fa-bell faa-ring animated me-4 "
                            data-count={
                              getNotificationSellerResult.data.filter(
                                (item) => item.isReadSeller === false
                              ).length
                            }
                          ></i>
                          Notifications
                        </>
                      ) : (
                        <>
                          <i className="fas fa-bell me-4"></i>
                          Notifications
                        </>
                      )
                    ) : getNotificationSellerLoading ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin"></i>
                        Notifications
                      </>
                    ) : (
                      ""
                    )
                  ) : getNotificationBuyerResult ? (
                    getNotificationBuyerResult.data.filter(
                      (item) => item.isReadBuyer === false
                    ).length > 0 ? (
                      <>
                        <i
                          className="fas fa-bell faa-ring animated me-4"
                          data-count={
                            getNotificationBuyerResult.data.filter(
                              (item) => item.isReadBuyer === false
                            ).length
                          }
                        ></i>
                        Notifications
                      </>
                    ) : (
                      <>
                        <i className="fas fa-bell me-4"></i>
                        Notifications
                      </>
                    )
                  ) : getNotificationBuyerLoading ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                      Notifications
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
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
            </>
          )}
          <li>
            <Link to="/">
              <button
                type="button"
                className="btn btn-primary is-block ms-auto mt-3"
                onClick={handleLogout}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Logout
              </button>
            </Link>
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
        <div className="offcanvas-body overflow-hidden">
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
