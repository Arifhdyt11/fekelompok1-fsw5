import Button from "../../elements/Button";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-auto" style={{ width: 350 }}>
              <a className="navbar-brand" href="#">
                NavbarLogo
              </a>
              <p className="brand-tagline">Be Trend And In Style.</p>
            </div>
            <div className="col-auto mr-5">
              <h6 className="mt-2">For Beinners</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Button type="link" href="/register">
                    New Account
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button type="link" href="/properties">
                    Start Buy a Shoes
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button type="link" href="/use-payments">
                    Use Payments
                  </Button>
                </li>
              </ul>
            </div>
            <div className="col-2 mr-5">
              <h6 className="mt-2">Explore Us</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Button type="link" href="/careers">
                    Our Careers
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button type="link" href="/privacy">
                    Privacy
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button type="link" href="/terms">
                    Terms & Conditions
                  </Button>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <h6 className="mt-2">Connect Us</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Button
                    isExternal
                    type="link"
                    href="mailto:support@staycation.id"
                  >
                    support@shoesbinar.com
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button isExternal type="link" href="tel:+622122081996">
                    021 - 2208 - 1996
                  </Button>
                </li>
                <li className="list-group-item">
                  <span>Shoes Binar, Jakarta</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col text-center copyrights">
              Copyright 2022 • Binar Academy • ShoesBinar
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
