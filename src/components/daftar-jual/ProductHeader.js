import SellerImg from "assets/images/login2.png";

function ProductHeader() {
  return (
    <div className="content-header">
      <div className="header-title">
        <h3>Daftar Jual Saya</h3>
      </div>
      <div className="card-info-seller p-4 is-block">
        <div className="d-flex justify-content-start">
          <img className="seller-image me-3" src={SellerImg} alt="" />
          <div>
            <h4>Nama Penjual</h4>
            <p>Kota</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHeader;
