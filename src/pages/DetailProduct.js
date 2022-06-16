import ActionDetail from "../components/ActionDetail";
import DescriptionProduct from "../components/DescriptionProduct";
import Footer from "../components/Footer";
import Galery from "../components/Galery";
import Navbar from "../components/Navbar";
import ProductTitle from "../components/ProductTitle";

export default function Product(props) {
  const { isSeller } = props;
  return (
    <>
      <Navbar />
      <ProductTitle />
      <Galery />
      <section className="container section-detail-product mb-5">
        <div className="row">
          <div className="col-7">
            <DescriptionProduct />
          </div>
          <div className="col-5 d-flex align-items-center">
            <ActionDetail isSeller={isSeller} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
