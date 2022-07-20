import React, { useState, useCallback, useEffect } from "react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Button from "elements/Button";
import ModalChangePass from "components/ModalChangePass";

export default function NotifikasiPage() {
  return (
    <div>
      <div>
        <Navbar isLogin="yes" />
      </div>
      <div>
        <div className="container mt-lg-5 mb-5" id="profile">
          <div className="row ">
            <div className="col-md-1 col-sm-12  divArrow">
              <Button type="link" href="/" className="arrow" nonStyle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-arrow-left-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
              </Button>
            </div>
            <div className="col-md-11 col-sm-12 mb-4 ">
              <p>Halo</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>

      <ModalChangePass />
    </div>
  );
}
