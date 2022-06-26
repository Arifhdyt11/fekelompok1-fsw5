import Button from "elements/Button";
import Notification from "./Notification";

function CekSeller(props) {
  const { isSeller } = props;
  if (isSeller === "yes") {
    return (
      <>
        <hr className="my-3" />
        <li className="px-2">
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
        </li>
      </>
    );
  }
}

export default function NavbarDropdown(props) {
  const { isSeller } = props;
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
                <i className="fa-duotone fa-user me-3"></i>Nama User
                <span className="span-dropdown"> as</span>
                Buyers
              </h4>
            </li>
            <hr />
            <li>
              <a className="dropdown-item" href="/profile">
                <i className="fa-duotone fa-gears me-3"></i>Edit Profile
              </a>
            </li>
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
            <CekSeller isSeller={isSeller} />
          </ul>
        </div>
      </div>
    </>
  );
}
