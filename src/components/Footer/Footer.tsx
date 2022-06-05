import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <h3>
        <span
          style={{ color: "black", fontWeight: "bold", marginRight: "10px" }}
        >
          &#169;
        </span>{" "}
        Rizwan Farooqui 2022{" "}
        <span
          style={{ color: "black", fontWeight: "bold", marginLeft: "10px" }}
        >
          Tees Store
        </span>
      </h3>
    </div>
  );
};

export default Footer;
