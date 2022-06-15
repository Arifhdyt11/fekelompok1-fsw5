import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Product from "./components/Product";
import Footer from "./components/Footer";

import landingPage from "../json/landingPage.json";
import { React, Component } from "react";

export default class LandingPage extends Component {
  render() {
    return (
      <>
        <Navbar></Navbar>
        <Hero></Hero>
        <Product data={landingPage.product}></Product>
        <Footer></Footer>
      </>
    );
  }
}
