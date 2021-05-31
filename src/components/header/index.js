import React from "react";
import LOGO from "../../assets/logo.png";
import AboutUs from "../../assets/about_us.jpg";

export default function Header() {
  return (
    <div className="header">
      <div className="top">
        <img
          src={LOGO}
          alt="logo"
          onClick={() => {
            window.location.href = "/front-map";
          }}
        />
        {/* <span className="github-button" >
          关注我们
        </span> */}
        <img
          class="github-button"
          src={AboutUs}
          alt="AboutUs"
        />
      </div>
      <div className="title">
        <span className="text">
          前端学习路线
          <span className="emoji">
            <span role="img" aria-label="line">🌋</span>
            {/* <span role="img" aria-label="road">⛰️</span> */}
          </span>
        </span>
      </div>
      <div className="sub-title"><span role="img" aria-label="workholic">👨🏻‍💻</span> 今天不学习，明天变垃圾 </div>
    </div>
  );
}
