import React, { useEffect } from "react";
import image403 from "assets/images/image403.png";
import Button from "elements/Button";
import Navbar from "components/Navbar";
import { useSelector } from "react-redux";

export default function Forbidden() {
  useEffect(() => {
    document.title = "403 | Access Denied";
    window.scrollTo(0, 0);
  });

  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
  return (
    <div>
      <Navbar />
      <div className="container text-center">
        <div>
          <img src={image403} style={{ width: "50%" }} />
        </div>
        <div>
          <h2>Access denied. . .</h2>
          <p>Sorry, you must login first too see this page </p>
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
