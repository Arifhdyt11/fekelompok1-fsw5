import "assets/css/landingPage.css";

import Navbar from "components/Navbar";
import Hero from "components/Hero";
import Product from "components/Product";
import Footer from "components/Footer";

import landingPage from "json/landingPage.json";

export default function LandingPage() {
  return (
    <>
      <Navbar isSearch="yes"></Navbar>
      <Hero></Hero>
      <Product data={landingPage.product}></Product>
      <Footer></Footer>
    </>
  );
}
