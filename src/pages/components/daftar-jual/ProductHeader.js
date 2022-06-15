import React from "react";
import gambar from "../../../assets/images/login2.png";

function ProductHeader() {
    return (

        <div className="content-header">
            <div className="header-title">
                <h3>Daftar Jual Saya</h3>
            </div>
            <div className="header-body d-flex justify-content-between align-items-center">
                <div className="d-flex flex-row align-items-center">
                    <div className="d-flex flex-row align-items-center">
                        <div className="img-user">
                            <img src={gambar} alt="" className="img-fluid" width="30" />
                        </div>
                        <div className="ms-2 user-details">
                            <h6 className="mb-0">Nama Penjual</h6>
                            <span className="kota">Kota</span>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-sm btn-outline-primary btn-edit">Edit</button>
            </div>
        </div>

    );
}

export default ProductHeader;