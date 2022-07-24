import React, { useState, useCallback, useEffect } from "react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import kamera from "assets/images/fotoProfile.png";
import "assets/css/profile.css";
import Button from "elements/Button";
import ModalChangePass from "components/ModalChangePass";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetail } from "store/actions/authAction";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getKota, getProvinsi } from "store/actions/cityAction";
import { handleHeaderSwal, handleSwal } from "utils/sweetAlert";

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
  const [name, setName] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

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
      if (user.data.name !== null) {
        // document.getElementById("nameInput").value = user.data.name;
        setName(user.data.name);
      }
      if (user.data.province !== null) {
        // document.getElementById("cityInput").value = user.data.city;
        setProvinsi(user.data.province);
      }
      if (user.data.city !== null) {
        // document.getElementById("cityInput").value = user.data.city;
        setKota(user.data.city);
      }
      if (user.data.address !== null) {
        setAddress(user.data.address);
      }
      if (user.data.phone !== null) {
        // document.getElementById("addressInput").value = user.data.address;
        setPhone(user.data.phone);
      }
      if (user.data.image !== null) {
        document.getElementById("filePhoto").src = user.data.image;
      } else {
        document.getElementById("filePhoto").src = kamera;
      }
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length <= 8) {
      handleSwal("Phone Number cannot be less than 9", "error");
    }
    if (address == "") {
      handleSwal("Address cannot be empty", "error");
    }
    if (kota === "") {
      handleSwal("City cannot be empty", "error");
    }
    if (provinsi === "") {
      handleSwal("Province cannot be empty", "error");
    }
    if (name === "") {
      handleSwal("Name cannot be empty", "error");
    }

    const update = {
      name: name,
      province: provinsi,
      city: kota,
      address: address,
      phone: phone,
      image,
    };

    if (
      name !== "" &&
      provinsi !== "" &&
      kota !== "" &&
      address !== "" &&
      phone.length >= 9
    ) {
      handleHeaderSwal(
        "Data sudah benar ?",
        "Apakah anda yakin ingin menyimpan data ini ?",
        "warning",
        true,
        "Ya, Simpan!"
      ).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateUserDetail(update));
        }
      });
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleProvinsi = (e) => {
    setProvinsi(e.target.value);
  };
  const handleKota = (e) => {
    setKota(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
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
              <Button
                type="link"
                href={user.data.role === "SELLER" ? "/seller" : "/"}
                className="arrow"
                nonStyle
              >
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
                <div className="mb-3 text-center">
                  <p className="text-center">
                    Klik gambar untuk mengubah foto profile
                  </p>
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
                    type="text"
                    className="form-control borderRadius"
                    id="nameInput"
                    placeholder="Nama"
                    data-testid="input-namaProfile"
                    value={name}
                    onChange={handleName}
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
                      value={kota}
                      onChange={handleKota}
                    >
                      <option value="">Pilih Kota</option>
                      {getKotaResult
                        ? getKotaResult.map((item) => {
                            return (
                              <>
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
                    data-testid="input-alamatProfile"
                    value={address}
                    onChange={handleAddress}
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
                ""
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
