import SellerImg from "assets/images/seller-1.png";
import Button from "elements/Button";

function CheckButton(props) {
  const { isSeller } = props;
  if (isSeller === "yes") {
    return (
      <>
        <Button className="btn mt-3 ms-auto py-2" isPrimary hasShadow isBlock>
          Terbitkan
        </Button>
        <Button className="btn mt-3 ms-auto py-2" isSecondary hasShadow isBlock>
          Edit
        </Button>
      </>
    );
  } else {
    return (
      <Button className="btn mt-3 ms-auto py-2" isPrimary hasShadow isBlock>
        Tertarik dan Nego
      </Button>
    );
  }
}

export default function ActionDetail(props) {
  const { isSeller } = props;
  return (
    <div className="card-detail-right ms-auto p-4">
      <div className="d-flex justify-content-start mb-4">
        <img className="seller-image me-3" src={SellerImg} alt="" />
        <div>
          <h4>Nama Penjual</h4>
          <p>Kota</p>
        </div>
      </div>
      <h4>Harga</h4>
      <h3>Rp. 2.500.000</h3>
      <CheckButton isSeller={isSeller} />
    </div>
  );
}
