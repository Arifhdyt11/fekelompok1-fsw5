import Button from "elements/Button";
import ModalInfoPenawar from "./ModalInfoPenawar";
import ModalStatusInfoPenawar from "./ModalStatusInfoPenawar";

export default function ProdukInfoPenawar({ dataProduct, productbid }) {
  return (
    <div className="mt-4 mb-5">
      <div key={dataProduct.id}>
        <div className="mb-3 mt-5">
          <h3>Daftar Produkmu yang Ditawar</h3>
        </div>
        <div className="card is-block ms-auto p-4">
          <div className="row">
            <div className="col-lg-2 col-sm-12 align-self-center text-center">
              <img
                className="img-fluid mb-lg-0 mb-4"
                src={dataProduct.image}
                alt=""
              />
            </div>
            <div className="col-lg-10 col-sm-12">
              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <h5>Penawaran Product</h5>
                  <p>16 Jun, 12:45</p>
                </div>
                <h4>{dataProduct.name}</h4>
              </div>
              <div className="d-flex justify-content-start mb-3">
                <div className="me-auto">
                  <h5>Harga Awal</h5>
                  <h4>
                    <s>Rp. {dataProduct.price}</s>
                  </h4>
                </div>
                <div className="me-auto">
                  <h5>Ditawar</h5>
                  <h4>Rp. {dataProduct.priceBid}</h4>
                </div>
              </div>
              {productbid.map((item) => (
                <div key={item.id}>
                  {item.statusBeli === "berhasil" ? (
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-secondary mx-2 is-block btn-has-radius "
                        data-bs-toggle="modal"
                        data-bs-target="#modalStatusInfoPenawar"
                      >
                        Status
                      </button>
                      <ModalStatusInfoPenawar productbid={productbid} />
                      <Button
                        className="btn btn-primary mx-2 is-block btn-has-radius"
                        isPrimary
                        hasShadow
                        isExternal
                        type="link"
                        href="https://wa.me/628974233275"
                      >
                        Hubungi
                        <i className="fa-brands fa-whatsapp ms-2"></i>
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <Button
                        className="btn btn-secondary mx-2 "
                        href="/seller"
                        type="link"
                        isBlock
                        hasRadius
                      >
                        Tolak
                      </Button>
                      <button
                        type="button"
                        className="btn btn-primary mx-2 is-block btn-has-radius"
                        data-bs-toggle="modal"
                        data-bs-target="#modalInfoPenawar"
                      >
                        Terima
                      </button>
                      <ModalInfoPenawar dataProduct={dataProduct} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
