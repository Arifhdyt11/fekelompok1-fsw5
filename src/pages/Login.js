import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "assets/css/login.css";
import BrandIcon from "components/IconText";
import { Navigate } from "react-router-dom";

import { loginViaForm, loginWithGoogle } from "store/actions/authAction";
import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  useEffect(() => {
    document.title = "Shoesnarian | Login";
    window.scrollTo(0, 0);
  });

  const dispatch = useDispatch();
  const { isAuthenticated, user, error } = useSelector(
    (state) => state.AuthReducer
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Please enter your email");
    }
    if (password === "") {
      alert("Password cannot be empty");
    }
    if (email !== "" && password !== "") {
      dispatch(loginViaForm({ email, password }));
    }
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
    <>
      {!isAuthenticated ? (
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
              <div className="col-sm-7 login-section-wrapper">
                <div className="login-wrapper my-auto mx-auto">
                  <BrandIcon />
                  <h1 className="login-title mt-2">Masuk</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control form-control-custom"
                        placeholder="Contoh: johndee@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="password">Password</label>
                      <div className="input-group">
                        <input
                          type="password"
                          name="password"
                          className="form-control form-control-password"
                          placeholder="Masukkan password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <span className="input-group-text " id="basic-addon2">
                          <i className="uil uil-eye"></i>
                        </span>
                      </div>
                    </div>
                    <button
                      name="login"
                      id="login"
                      className="btn btn-block login-btn"
                      type="submit"
                      value="Masuk"
                    >
                      Masuk
                    </button>
                  </form>
                  <p className="login-wrapper-footer-text mb-3">
                    Belum punya akun?
                    <Link to="/register" className="text-reset">
                      Daftar di sini
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
      ) : user.data.role === "SELLER" ? (
        <Navigate to={`/seller`} />
      ) : (
        <Navigate to={`/`} />
      )}
    </>
  );
}

export default Login;
