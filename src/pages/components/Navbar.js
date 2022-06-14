import Button from "../../elements/Button";
import BrandIcon from "./IconText";

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3">
      <div className="container">
        <BrandIcon />
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <form className="d-flex ms-5">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>

          <Button
            className="btn ms-auto px-3 py-2"
            hasShadow
            isPrimary
            href="/login"
            type="link"
          >
            Masuk
          </Button>
        </div>
      </div>
    </nav>
  );
}
