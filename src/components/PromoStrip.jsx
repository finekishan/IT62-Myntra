import React from "react";
import "./PromoStrip.css";
import logo from "../assets/myntra_logo.webp";

function PromoStrip() {
  return (
    <div className="offerStripWrapper">
      <div className="offerStrip">

        <div className="offerLeft">
          <h2>FLAT ₹300 OFF</h2>
        </div>

        <div className="offerRight">
          <p className="offerTextTop">On Your 1st Purchase</p>
          <div className="offerTextBottom">
            <span>Via </span>
            <div className="offerLogoWrap">
              <img src={logo} alt="Myntra" className="offerLogo" />
              <span className="offerLogoText">Myntra</span>
            </div>
            <span className="appText">App!</span>
          </div>
        </div>

        <span className="centerCut topCut"></span>
        <span className="centerCut bottomCut"></span>

        <div className="rightPerforation">
          <span></span>
          <span></span>
        </div>

      </div>
    </div>
  );
}

export default PromoStrip;
