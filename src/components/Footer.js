import Button from "elements/Button";
import BrandIcon from "./IconText";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <BrandIcon />
            <p className="brand-tagline">Be Trend And In Style.</p>
          </div>
          <div className="col-lg-2 col-sm-12 col-md-3 me-3">
            <h5 className="mt-2">For Beinners</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Button type="link" href="/register">
                  New Account
                </Button>
              </li>
              <li className="list-group-item">
                <Button type="link" href="/properties" data-testid="footer">
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
          <div className="col-lg-2 col-sm-12 col-md-3 me-3">
            <h5 className="mt-2">Explore Us</h5>
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
          <div className="col-lg-2 col-sm-12 col-md-3 ">
            <h5 className="mt-2">Connect Us</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Button
                  isExternal
                  type="link"
                  href="mailto:support@shoesnarian.com"
                >
                  support@shoesnarian.com
                </Button>
              </li>
              <li className="list-group-item">
                <Button isExternal type="link" href="tel:+622122081996">
                  021 - 2208 - 1996
                </Button>
              </li>
              <li className="list-group-item">
                <span>Shoesnarian, Jakarta</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-center copyrights">
            Copyright 2022 • Binar Academy • Shoesnarian
          </div>
        </div>
      </div>
    </footer>
  );
}
