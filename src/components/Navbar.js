import Button from "elements/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "store/actions/authAction";
import BrandIcon from "./IconText";
import NavbarDropdown from "./NavbarDropdown";

function CheckSearch(props) {
  const { isSearch } = props;
  if (isSearch === "yes") {
    return (
      <form className="d-flex ms-5">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    );
  } else {
    return <></>;
  }
}

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
function CheckSearchMobile(props) {
  const { isSearch } = props;
  if (isSearch === "yes") {
    return (
      <form className="d-flex mb-3">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    );
  } else {
    return <></>;
  }
}

function CheckLoginMobile({ isAuthenticated, error }) {
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  if (isAuthenticated) {
    return (
      <>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <label className="fa-solid fa-user fa-lg"></label>
            <a
              className="nav-link active ms-2"
              href="/profile"
              style={{ display: "inline-block" }}
            >
              Edit Profile
            </a>
          </li>
          <li className="nav-item">
            <label className="fa-solid fa-bell fa-lg"></label>
            <a
              className="nav-link active ms-2"
              href="#"
              style={{ display: "inline-block" }}
            >
              Notification
            </a>
          </li>
          <li>
            <label className="fa-solid fa-store"> </label>
            <a
              className="nav-link active ms-2"
              href="/seller"
              style={{ display: "inline-block" }}
            >
              Seller Center
            </a>
          </li>
          <li>
            <label className="fa-solid fa-ellipsis-stroke"></label>
            <a
              className="nav-link active ms-2"
              href="/seller"
              style={{ display: "inline-block" }}
            >
              Layanan Lainnya
            </a>
          </li>
          <li>
            <Button
              className="btn ms-auto mt-3"
              hasShadow
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
        isPrimary
        href="/login"
        type="link"
      >
        Masuk
      </Button>
    );
  }
}

export default function Navbar({ isSearch }) {
  const { isAuthenticated, error } = useSelector((state) => state.AuthReducer);

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
            <CheckSearchMobile isSearch={isSearch} />
            <CheckLoginMobile isAuthenticated={isAuthenticated} error={error} />
          </div>
        </div>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <CheckSearch isSearch={isSearch} />
          <CheckLogin isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </nav>
  );
}
