import React, { useEffect } from "react";
import image404 from "assets/images/image404.png";
import Button from "elements/Button";
import Navbar from "components/Navbar";
import { useSelector } from "react-redux";

export default function PageNotFound() {
  useEffect(() => {
    document.title = "404 | Page Not Found";
    window.scrollTo(0, 0);
  });

  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
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
            href={
              isAuthenticated
                ? user.data.role === "SELLER"
                  ? "/seller"
                  : "/"
                : "/"
            }
          >
            GO BACK
          </Button>
        </div>
      </div>
    </div>
  );
}
