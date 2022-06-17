import ActionDetail from "components/ActionDetail";
import DescriptionProduct from "components/DescriptionProduct";
import Footer from "components/Footer";
import Galery from "components/Galery";
import Navbar from "components/Navbar";
import ProductTitle from "components/ProductTitle";

export default function Product(props) {
  const { isSeller, isLogin } = props;
  return (
    <>
      <Navbar isLogin={isLogin} isSeller="yes" />
      <ProductTitle />
      <Galery />
      <section className="container section-detail-product mb-5">
        <div className="row">
          <div className="col-lg-5 order-sm-5 mb-4 mb-lg-0 d-flex align-items-center">
            <ActionDetail isSeller={isSeller} />
          </div>
          <div className="col-lg-7 order-sm-1 ">
            <DescriptionProduct />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
