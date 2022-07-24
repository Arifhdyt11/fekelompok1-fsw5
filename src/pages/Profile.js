import React, { useState, useCallback, useEffect } from "react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import kamera from "assets/images/fotoProfile.png";
import "assets/css/profile.css";
import Button from "elements/Button";
import ModalChangePass from "components/ModalChangePass";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetail } from "store/actions/authAction";
import Swal from "sweetalert2";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getKota, getProvinsi } from "store/actions/cityAction";

function handleError(message) {
  return Swal.fire({
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

export default function ProfilePage() {
  useEffect(() => {
    document.title = "Shoesnarian | Profile";
  });

  const dispatch = useDispatch();
  const { user, loadingUpdate } = useSelector((state) => state.AuthReducer);

  const { getProvinsiResult, getKotaResult } = useSelector(
    (state) => state.CityReducer
  );

  const [image, setImage] = useState(kamera);
  const [phone, setPhone] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");

  useEffect(() => {
    dispatch(getProvinsi());
  }, [dispatch]);

  useEffect(() => {
    if (provinsi) {
      dispatch(getKota(provinsi));
    }
  }, [provinsi, dispatch]);

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

  useEffect(() => {
    if (user) {
      if (user.data.name !== null)
        document.getElementById("nameInput").value = user.data.name;
      if (user.data.province !== null) {
        // document.getElementById("cityInput").value = user.data.city;
        setProvinsi(user.data.province);
      }
      if (user.data.city !== null) {
        // document.getElementById("cityInput").value = user.data.city;
        setKota(user.data.city);
      }
      if (user.data.address !== null)
        document.getElementById("addressInput").value = user.data.address;
      if (user.data.phone !== null) setPhone(user.data.phone);
      if (user.data.image !== null) {
        document.getElementById("filePhoto").src = user.data.image;
      } else {
        document.getElementById("filePhoto").src = kamera;
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (kota === "") {
      handleError("City cannot be empty");
    }
    if (phone === "") {
      handleError("Phone Number cannot be empty");
    }
    if (phone.length <= 8) {
      handleError("Phone Number cannot be less than 9");
    }
    const update = {
      name: document.getElementById("nameInput").value,
      province: provinsi,
      city: kota,
      address: document.getElementById("addressInput").value,
      phone: phone,
      image,
    };
    if (phone.length >= 9) {
      Swal.fire({
        title: "Data sudah benar ?",
        text: "Apakah anda yakin ingin menyimpan data ini ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateUserDetail(update));
        }
      });
    }
  };

  const handleProvinsi = (e) => {
    setProvinsi(e.target.value);
  };
  const handleKota = (e) => {
    setKota(e.target.value);
  };

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
              <form onSubmit={handleSubmit}>
                <p className="text-center">Click Image If You Want To Change</p>
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
                    accept=".jpg,.jpeg,.png"
                    onChange={handleUpload}
                    hidden
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="nameInput" className="form-label">
                    Nama <label className="text-red">*</label>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control borderRadius"
                    id="nameInput"
                    placeholder="Nama"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="provinsiInput" className="form-label">
                    Provinsi <label className="text-red">*</label>
                  </label>
                  <select
                    className="form-select borderRadius"
                    aria-label="Default select example"
                    id="provinsiInput"
                    name="provinsi"
                    value={provinsi}
                    onChange={handleProvinsi}
                  >
                    <option value="">Pilih Provinsi</option>
                    {getProvinsiResult
                      ? getProvinsiResult.map((item) => {
                          return (
                            <>
                              <option value={item.id}>{item.name}</option>
                            </>
                          );
                        })
                      : ""}
                  </select>
                </div>

                {provinsi ? (
                  <div className="mb-3 ">
                    <label htmlFor="cityInput" className="form-label">
                      Kota <label className="text-red">*</label>
                    </label>
                    <select
                      className="form-select borderRadius"
                      aria-label="Default select example"
                      id="cityInput"
                      placeholder="Pilih Kota"
                      required
                      value={kota}
                      onChange={handleKota}
                    >
                      <option value="">Pilih Kota</option>
                      {getKotaResult
                        ? getKotaResult.map((item) => {
                            return (
                              <>
                                {/* <option value="">Pilih Kota</option> */}
                                <option value={item.name}>{item.name}</option>
                              </>
                            );
                          })
                        : ""}
                    </select>
                  </div>
                ) : (
                  ""
                )}

                <div className="mb-3 ">
                  <label htmlFor="addressInput" className="form-label">
                    Alamat <label className="text-red">*</label>
                  </label>
                  <textarea
                    required
                    className="form-control borderRadius"
                    id="addressInput"
                    rows="3"
                    placeholder="Contoh: Jalan Ikan Hiu 33"
                  ></textarea>
                </div>
                <div className="mb-3 ">
                  <label htmlFor="phoneInput" className="form-label">
                    No Handphone <label className="text-red">*</label>
                  </label>
                  <PhoneInput
                    country={"id"}
                    value={phone}
                    onChange={setPhone}
                    masks={{ id: "...-....-....-...." }}
                  />
                </div>

                <div className="d-flex flex-column">
                  {loadingUpdate ? (
                    <Button
                      className="btn px-3 py-2 borderRadius"
                      hasShadow
                      isPrimary
                      isLoading
                    ></Button>
                  ) : (
                    <Button
                      className="btn px-3 py-2 borderRadius"
                      hasShadow
                      isPrimary
                      type="button"
                    >
                      Simpan
                    </Button>
                  )}
                </div>
              </form>
              {loadingUpdate ? (
                <Button
                  className="btn btn-dark borderRadius mt-4 "
                  isBlock
                  isLoading
                ></Button>
              ) : user ? (
                user.data.registeredVia === "auth-form" ? (
                  <button
                    className="btn btn-dark borderRadius is-block mt-4 "
                    data-bs-toggle="modal"
                    data-bs-target="#modalPassword"
                  >
                    Change Password
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              <ModalChangePass />
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
