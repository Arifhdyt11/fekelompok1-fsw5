import Button from "elements/Button";

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
        <div class="dropdown menu me-4">
          <button
            class=" btn-none-style"
            type="button"
            id="dropdownbell"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-bars fa-lg"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownbell">
            <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown notification me-4">
          <button
            class=" btn-none-style"
            type="button"
            id="dropdownbell"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-bell fa-lg"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownbell">
            <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown user">
          <button
            class=" btn-none-style "
            type="button"
            id="dropdownuser"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-user fa-lg"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownuser">
            <li>
              <a class="dropdown-item" href="/profile">
                Edit Profile
              </a>
            </li>
            <CekSeller isSeller={isSeller} />
          </ul>
        </div>
      </div>
    </>
  );
}
