import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/login.css";
import BrandIcon from "./components/IconText";

function Register() {
    return (
        <main>
            <div className="container-fluid">
                <div className="row">
                    {/* 1 */}
                    <div className="col-sm-5 px-0 d-none d-sm-block img-section-wrapper">
                        <div alt="login image" className="login-img "> </div>
                    </div>
                    {/* 2 */}
                    <div className="col-sm-7 login-section-wrapper register">
                        <div className="login-wrapper my-auto mx-auto">
                            <BrandIcon />
                            <h1 className="login-title mt-2">Daftar</h1>
                            <form action="#!">

                                <div className="form-group">
                                    <label for="name">Nama</label>
                                    <input type="text" name="" id="name" className="form-control form-control-custom"
                                        placeholder="Nama Lengkap" />
                                </div>

                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" name="email" id="email" className="form-control form-control-custom"
                                        placeholder="Contoh: johndee@gmail.com" />
                                </div>

                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <div className="input-group">
                                        <input type="password" className="form-control form-control-password" placeholder="Masukkan password" />
                                        <span className="input-group-text " id="basic-addon2">
                                            <i className="uil uil-eye"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group  mb-4">
                                    <label for="role">Daftar Sebagai</label>
                                    <select className="form-control form-control-custom">
                                        <option>Seller</option>
                                        <option>Buyer</option>
                                    </select>
                                </div>
                                <button name="login" id="login" className="btn btn-block login-btn" type="button" value="Masuk"> Daftar
                                </button>
                            </form>
                            <p className="login-wrapper-footer-text">Sudah punya akun?
                                <Link to="/login" className="text-reset"> Masuk di sini</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;