import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "assets/css/login.css";
import BrandIcon from "components/IconText";

// TODO: Redux
import { useDispatch } from "react-redux";
import { addRegister } from "store/actions/registerAction";

import { loginWithGoogle } from "store/actions/authAction";
import { useGoogleLogin } from "@react-oauth/google";

function Register() {
  useEffect(() => {
    document.title = "Shoesnarian | Register";
    window.scrollTo(0, 0);
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addRegister({ email: email, password: password, name: name, role: role })
    );
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
            <div alt="login image" className="login-img ">
              {" "}
            </div>
          </div>
          {/* 2 */}
          <div className="col-sm-7 login-section-wrapper register">
            <div className="login-wrapper my-auto mx-auto">
              <BrandIcon />
              <h1 className="login-title mt-2">Daftar</h1>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className="form-group">
                  <label htmlFor="name">Nama</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control form-control-custom"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control form-control-custom"
                    placeholder="Contoh: johndee@gmail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                    <span className="input-group-text " id="basic-addon2">
                      <i className="uil uil-eye"></i>
                    </span>
                  </div>
                </div>
                <div className="form-group  mb-4">
                  <label htmlFor="role">Daftar Sebagai</label>
                  <select
                    className="form-control form-control-custom"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    required
                  >
                    <option hidden selected>
                      -- Pilih Role --
                    </option>
                    <option value="SELLER">Seller</option>
                    <option value="BUYER">Buyer</option>
                  </select>
                </div>
                <button
                  name="login"
                  id="login"
                  className="btn btn-block login-btn"
                  type="submit"
                  value="Masuk"
                >
                  Daftar
                </button>
              </form>
              <p className="login-wrapper-footer-text">
                Sudah punya akun?
                <Link to="/login" className="text-reset">
                  Masuk di sini
                </Link>
              </p>

              <button
                className="btn btn-block login-btn"
                type="button"
                onClick={() => googleLogin()}
              >
                <i className="uil uil-google"></i> Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
