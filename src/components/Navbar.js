import Button from "elements/Button";
import BrandIcon from "./IconText";

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
function CheckLogin(props) {
  const { isLogin } = props;
  if (isLogin === "yes") {
    return <></>;
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

export default function Navbar(props) {
  const { isSearch, isLogin } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3">
      <div className="container">
        <BrandIcon />
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <CheckSearch isSearch={isSearch} />
          <CheckLogin isLogin={isLogin} />
        </div>
      </div>
    </nav>
  );
}
