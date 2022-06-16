import React from "react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import fotoProfile from "assets/images/fotoProfile.png";
import "assets/css/profile.css";
import Button from "elements/Button";

export default function ProfilePage() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <div className="container mt-lg-5 mb-5" id="profile">
          <div className="row ">
            <div className="col-md-1 col-sm-12  divArrow">
              <a href="/" className="arrow">
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
              </a>
            </div>
            <div className="col-md-11 col-sm-12 mb-4 ">
              <div className="fotoProfile">
                <img src={fotoProfile} alt=""></img>
              </div>
              <form>
                <div className="mb-3 ">
                  <label htmlFor="nameInput" className="form-label">
                    Nama<label className="notifInfoPenawaran">*</label>
                  </label>
                  <input
                    type="text"
                    className="form-control borderRadius"
                    id="nameInput"
                    placeholder="Nama"
                  />
                </div>

                <div className="mb-3 ">
                  <label htmlFor="nameInput" className="form-label">
                    Kota
                  </label>
                  <input
                    type="text"
                    className="form-control borderRadius"
                    id="nameInput"
                    placeholder="Pilih Kota"
                  />
                </div>

                <div className="mb-3 ">
                  <label htmlFor="address" className="form-label">
                    Alamat
                  </label>
                  <textarea
                    className="form-control borderRadius"
                    id="addressInput"
                    rows="3"
                    placeholder="Contoh: Jalan Ikan Hiu 33"
                  ></textarea>
                </div>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    No Handphone<label className="notifInfoPenawaran">*</label>
                  </label>
                  <input
                    type="email"
                    className="form-control borderRadius"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="+628123456789"
                  />
                </div>
                <div className="d-flex flex-column">
                  <Button
                    className="btn px-3 py-2 borderRadius"
                    hasShadow
                    isPrimary
                    href="/login"
                    type="link"
                  >
                    Simpan
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
