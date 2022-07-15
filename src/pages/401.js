import React, { useEffect } from "react";
import image401 from "assets/images/image401.png";
import Button from "elements/Button";
import Navbar from "components/Navbar";
import { useSelector } from "react-redux";

export default function Unauthorized() {
  useEffect(() => {
    document.title = "401 | Unauthorize";
    window.scrollTo(0, 0);
  });

  const { user } = useSelector((state) => state.AuthReducer);
  return (
    <div>
      <Navbar />
      <div className="container text-center">
        <div>
          <img src={image401} style={{ width: "50%" }} />
        </div>
        <div>
          <h2>No authorization found</h2>
          <p>This page is not publically available</p>
          <Button
            className="btn btn-primary borderRadius mt-3 ps-4 pe-4"
            hasShadow
            isPrimary
            type="link"
            href={user.data.role === "SELLER" ? "/seller" : "/"}
          >
            GO BACK
          </Button>
        </div>
      </div>
    </div>
  );
}
