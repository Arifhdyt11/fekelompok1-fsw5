import React from "react";

export default function Navbar() {
  return (
    <div className="header py-2">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              NavbarLogo
            </a>
            <div
              className="collapse navbar-collapse "
              id="navbarSupportedContent"
            >
              <form className="d-flex ms-5">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
              <button className="btn btn-login ms-auto px-3 py-2" type="submit">
                Masuk
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
