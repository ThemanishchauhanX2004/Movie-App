import React from "react";
import bg from "../../assets/footer-bg.jpg";

const PageHeader = ({ children }) => {
  return (
    <div
      className="relative text-center mb-8 pt-[8rem] pb-8 bg-top bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h2 className="relative z-10 text-4xl font-bold">{children}</h2>
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
    </div>
  );
};

export default PageHeader;
