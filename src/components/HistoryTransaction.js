import SellerImg from "assets/images/img-infoPenawar2.jpg";
export default function HistoryTransaction({ product }) {
  return (
    <section className="container">
      <h2 className="mb-4 text-center">History Transaksi</h2>
      {product
        .filter((item) => item.status === "Terjual")
        .map((item) => {
          return (
            <div className="card is-block ms-auto p-4 mb-3">
              <div className="row">
                <div className="col-lg-7 col-md-9 col-sm-12">
                  <div className="row">
                    <div className="col-lg-4 col-md-5 col-sm-12  text-center">
                      <img
                        className="img-fluid mb-lg-0 mb-4"
                        src={item.image}
                        alt=""
                      />
                    </div>
                    <div className="col-lg-8 col-md-7 col-sm-12 align-self-center ">
                      <div className="mb-4">
                        <h5>Penawaran Product</h5>
                        <h4>{item.name}</h4>
                      </div>
                      <div className="d-flex justify-content-start mb-3">
                        <div className="me-auto">
                          <h5>Harga Awal</h5>
                          <h4>
                            <s>Rp. {item.price}</s>
                          </h4>
                        </div>
                        <div className="me-auto">
                          <h5>Ditawar</h5>
                          <h4>Rp. {item.priceBid}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-3 col-sm-12 align-self-center">
                  <div className="d-flex justify-content-start">
                    <img className="seller-image me-4" src={SellerImg} alt="" />
                    <div>
                      <h4>Nama Penjual</h4>
                      <p>Kota</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}
