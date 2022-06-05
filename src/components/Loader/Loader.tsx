import React from "react";
import { SpinnerDotted } from "spinners-react";
import { LoaderPropsInterface } from "../../interfaces/interface";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Loader.css";

const Loader = ({ cartItems }: LoaderPropsInterface) => {
  return (
    <>
      <Header cartItems={cartItems} navigation="cart" />
      <div className="loading">
        <SpinnerDotted style={{ color: "#1dc1f2" }} />
      </div>
      <Footer />
    </>
  );
};

export default Loader;
