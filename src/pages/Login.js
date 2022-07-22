import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "assets/css/login.css";
import BrandIcon from "components/IconText";
import { Navigate } from "react-router-dom";

import { loginViaForm, loginWithGoogle } from "store/actions/authAction";
import { useGoogleLogin } from "@react-oauth/google";

import LoginImg from "assets/images/login5.jpg";
import IconGoogle from "assets/images/ic_google.svg";
import Button from "elements/Button";

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
  const [passwordShown, setPasswordShown] = useState(false);

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
    <>
      {!isAuthenticated ? (
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-5 px-0 d-none d-sm-block img-section-wrapper">
                <div alt="login image" className="login-img "></div>
              </div>
              <div className="col-sm-7 login-section-wrapper">
                {/* <div className="col-sm-7 align-self-center"> */}
                <div className="login-wrapper my-auto mx-auto">
                  <BrandIcon />
                  <h3 className="mt-1 mb-4">Masuk</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        data-testid="input-emailUserLogin"
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
                          data-testid="input-passwordUserLogin"
                          type={passwordShown ? "text" : "password"}
                          name="password"
                          className="form-control form-control-password"
                          placeholder="Masukkan password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
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
                    <button
                      name="login"
                      id="login"
                      className="btn btn-block login-btn"
                      type="submit"
                      value="Masuk"
                      data-testid="login-submit"
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

                  <Button
                    className="btn login-google"
                    isBlock
                    onClick={() => googleLogin()}
                  >
                    <img
                      className="img-fluid me-2"
                      style={{ width: "20px" }}
                      src={IconGoogle}
                      alt=""
                    />
                    Sign In / Sign Up
                  </Button>
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
