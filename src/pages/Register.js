import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "assets/css/login.css";

import { useDispatch, useSelector } from "react-redux";
import { addRegister } from "store/actions/registerAction";
import { loginWithGoogle } from "store/actions/authAction";
import { useGoogleLogin } from "@react-oauth/google";

import IconGoogle from "assets/images/ic_google.svg";
import Button from "elements/Button";
import { handleSwal } from "utils/sweetAlert";
import BrandIcon from "components/IconText";

function Register() {
  useEffect(() => {
    document.title = "Shoesnarian | Register";
    window.scrollTo(0, 0);
  });

  const { addRegisterLoading } = useSelector((state) => state.RegisterReducer);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === "") {
      handleSwal("Role cannot be empty!", "error");
    }
    if (password.length <= 6) {
      handleSwal("Password cannot be less than 7!", "error");
    }
    if (password === "") {
      handleSwal("Password cannot be empty!", "error");
    }
    if (email === "") {
      handleSwal("Email cannot be empty!", "error");
    }
    if (name === "") {
      handleSwal("Name cannot be empty!", "error");
    }

    if (
      email !== "" &&
      password !== "" &&
      password.length > 7 &&
      name !== "" &&
      role !== ""
    ) {
      dispatch(
        addRegister({
          email: email,
          password: password,
          name: name,
          role: role,
        })
      );
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(loginWithGoogle(tokenResponse.access_token));
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          {/* 1 */}
          <div className="col-sm-5 px-0 d-none d-sm-block img-section-wrapper">
            <div alt="login image" className="login-img register "></div>
          </div>
          {/* 2 */}
          <div className="col-sm-7 login-section-wrapper register">
            <div className="login-wrapper my-auto mx-auto">
              <BrandIcon />
              <h1 className="login-title mt-1">Daftar</h1>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className="form-group">
                  <label htmlFor="name">Nama</label>
                  <input
                    data-testid="input-nameUser"
                    type="text"
                    name="name"
                    id="name"
                    className="form-control form-control-custom"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    data-testid="input-emailUser"
                    type="email"
                    name="email"
                    id="email"
                    className="form-control form-control-custom"
                    placeholder="Contoh: johndee@gmail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <input
                      data-testid="input-passwordUser"
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      className="form-control form-control-password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <span className="input-group-text " id="basic-addon2">
                      <i
                        className={
                          passwordShown
                            ? "fa-solid fa-eye-slash fa-lg"
                            : "fa-solid fa-eye fa-lg"
                        }
                        onClick={togglePasswordVisiblity}
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="form-group  mb-4">
                  <label htmlFor="role">Daftar Sebagai</label>
                  <select
                    className="form-control form-control-custom"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    data-testid="select-role"
                  >
                    <option hidden defaultValue="">
                      -- Pilih Role --
                    </option>
                    <option data-testid="select-option" value="SELLER">
                      Seller
                    </option>
                    <option data-testid="select-option" value="BUYER">
                      Buyer
                    </option>
                  </select>
                </div>
                {addRegisterLoading ? (
                  <Button
                    className="btn btn-block login-btn"
                    isLoading
                  ></Button>
                ) : (
                  <button
                    name="login"
                    id="login"
                    className="btn btn-block login-btn"
                    type="submit"
                    value="Masuk"
                  >
                    Daftar
                  </button>
                )}
              </form>
              <p className="login-wrapper-footer-text mb-3">
                Sudah punya akun?
                <Link to="/login" className="text-reset">
                  Masuk di sini
                </Link>
              </p>

              {addRegisterLoading ? (
                ""
              ) : (
                <Button
                  className="btn btn-dark"
                  isBlock
                  onClick={() => googleLogin()}
                >
                  <img
                    className="img-fluid me-2"
                    style={{ width: "20px" }}
                    src={IconGoogle}
                    alt=""
                  />
                  Sign Up With Google
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
