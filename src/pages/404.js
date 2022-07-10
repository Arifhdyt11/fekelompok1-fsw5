import React, { useEffect } from "react";
import image404 from "assets/images/image404.png";
import Button from "elements/Button";
import Navbar from "components/Navbar";

export default function PageNotFound() {
  useEffect(() => {
    document.title = "404 | Page Not Found";
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <Navbar />
      <div className="container text-center">
        <div>
          <img src={image404} style={{ width: "50%" }} />
        </div>
        <div>
          <h2>Oopps!...Page not found</h2>
          <p>Sorry, we can't find the page you're looking for</p>
          <Button
            className="btn btn-primary borderRadius mt-3 ps-4 pe-4"
            hasShadow
            isPrimary
            type="link"
            href="/"
          >
            GO BACK
          </Button>
        </div>
      </div>
    </div>
  );
}
