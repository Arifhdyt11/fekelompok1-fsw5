import Button from "elements/Button";
import Notification from "./Notification";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/actions/authAction";
import { useLocation } from "react-router-dom";

function CekSeller(props) {
  const { isSeller } = props;
  if (isSeller === "yes") {
    return <></>;
  }
}

export default function NavbarDropdown(props) {
  // TODO: Ini buat logout
  const dispatch = useDispatch();
  const { isAuthenticated, user, error } = useSelector(
    (state) => state.AuthReducer
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const { isSeller } = props;
  const location = useLocation();
  return (
    <>
      <div className="d-flex justify-content-center ms-auto">
        <Notification />

        <div className="dropstart user ms-3">
          <button
            className=" btn-none-style "
            type="button"
            id="dropdownuser"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-user fa-lg"></i>
          </button>
          <ul className="dropdown-menu p-2" aria-labelledby="dropdownuser">
            <li>
              <h4 className="dropdown-item item">
                <i className="fa-duotone fa-user me-3"></i>
                {user.data.name}
                <span className="span-dropdown"> as</span>
                {user.data.role === "SELLER" ? "Seller" : "Buyer"}
              </h4>
            </li>
            <hr />
            <li>
              <Button className="dropdown-item" type="link" href="/profile">
                <i className="fa-duotone fa-gears me-3"></i>Edit Profile
              </Button>
            </li>
            {user.data.role === "SELLER" ? (
              ""
            ) : (
              <>
                {" "}
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

            {!isAuthenticated ? (
              ""
            ) : user.data.role === "SELLER" ? (
              <>
                <hr className="my-3" />
                <li className="px-2 mb-3">
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
                <li className="px-2">
                  <Button
                    type="link"
                    href="/"
                    className="dropdown-item text-center btn-third"
                    hasShadow
                    isBlock
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <hr className="my-3" />
                <li className="px-2">
                  <Button
                    type="link"
                    href="/"
                    className="dropdown-item text-center"
                    isPrimary
                    hasShadow
                    isBlock
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </li>
              </>
            )}

            <CekSeller isSeller={isSeller} />
          </ul>
        </div>
      </div>
    </>
  );
}
