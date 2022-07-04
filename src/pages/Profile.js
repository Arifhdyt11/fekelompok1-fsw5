import React, { useState, useCallback, useEffect } from "react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import kamera from "assets/images/fotoProfile.png";
import fotoProfile from "assets/images/fotoProfile.png";
import "assets/css/profile.css";
import Button from "elements/Button";
import ModalChangePass from "components/ModalChangePass";
import { useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetail } from "store/actions/authAction";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/index";
import { useDropzone } from "react-dropzone";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user, status } = useSelector(
    (state) => state.AuthReducer
  );

  const [image, setImage] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("filePhoto").src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      setImage(e.target.files[0]);
    } else {
      document.getElementById("filePhoto").src = kamera;
      setImage("");
    }
  };
  // const handleUpload = () => {
  //   image.map((image) => {
  //     const storageRef = ref(storage, `images/${image.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, image);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         //Progress function ... (shows the load bar)
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         setProgress(progress);
  //       },
  //       (error) => {
  //         //Error Function...
  //         console.log(error);
  //       },
  //       async () => {
  //         //   //complete function
  //         const url = await getDownloadURL(storageRef);
  //         console.log(url);
  //       }
  //     );
  //   });
  // };

  React.useEffect(() => {
    if (location.pathname === "/profile") getUser();
  });

  function getUser() {
    localStorage.getItem(user);
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    } else {
      if (user !== undefined && status !== true) {
        if (user.name !== null)
          document.getElementById("nameInput").value = user.name;
        if (user.city !== null)
          document.getElementById("cityInput").value = user.city;
        if (user.address !== null)
          document.getElementById("addressInput").value = user.address;
        if (user.phone !== null)
          document.getElementById("phoneInput").value = user.phone;
        if (user.image !== null) {
          document.getElementById("filePhoto").src = user.image;
        } else {
          document.getElementById("filePhoto").src = kamera;
        }
      }
    }
  }

  const handleSubmit = async (e) => {
    dispatch(
      updateUserDetail({
        name: document.getElementById("nameInput").value,
        city: document.getElementById("cityInput").value,
        address: document.getElementById("addressInput").value,
        phone: document.getElementById("phoneInput").value,
        image,
      })
    );
  };

  console.log("image : ", image);

  if (status === true) {
    return <Navigate to={`/`} />;
  }

  return (
    <div>
      <div>
        <Navbar isLogin="yes" />
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
              <form>
                <input
                  type="text"
                  placeholder="Nama"
                  hidden
                  id="idUser"
                  required
                />
                <div className="mb-3 text-center">
                  <label htmlFor="file-input" id="preview">
                    <img
                      id="filePhoto"
                      className="display-none uploadImageInput m-2"
                      src={kamera}
                      alt=""
                      style={{ width: "110px" }}
                    />
                  </label>
                  <input
                    id="file-input"
                    name="myfile"
                    type="file"
                    onChange={handleUpload}
                    hidden
                  />
                </div>
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
                  <label htmlFor="cityInput" className="form-label">
                    Kota
                  </label>
                  <input
                    type="text"
                    className="form-control borderRadius"
                    id="cityInput"
                    placeholder="Pilih Kota"
                  />
                </div>

                <div className="mb-3 ">
                  <label htmlFor="addressInput" className="form-label">
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
                  <label htmlFor="phoneInput" className="form-label">
                    No Handphone
                    <label className="notifInfoPenawaran">*</label>
                  </label>
                  <input
                    type="number"
                    className="form-control borderRadius"
                    id="phoneInput"
                    placeholder="+628123456789"
                  />
                </div>
                <div className="d-flex flex-column">
                  <Button
                    className="btn px-3 py-2 borderRadius"
                    hasShadow
                    isPrimary
                    type="button"
                    onClick={() => handleSubmit()}
                  >
                    Simpan
                  </Button>

                  <a
                    href="#1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalPassword"
                    className="text-center mt-4"
                  >
                    Change Password
                  </a>
                </div>
              </form>
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
