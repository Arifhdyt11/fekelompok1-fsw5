import React from "react";
import gambar from "../../../assets/images/login2.png";

function ProductHeader() {
    return (

        <div class="content-header">
            <div class="header-title">
                <h3>Daftar Jual Saya</h3>
            </div>
            <div class="header-body d-flex justify-content-between align-items-center">
                <div class="d-flex flex-row align-items-center">
                    <div class="d-flex flex-row align-items-center">
                        <div class="img-user">
                            <img src={gambar} alt="" class="img-fluid" width="30" />
                        </div>
                        <div class="ms-2 user-details">
                            <h6 class="mb-0">Nama Penjual</h6>
                            <span class="kota">Kota</span>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-outline-primary btn-edit">Edit</button>
            </div>
        </div>

    );
}

export default ProductHeader;