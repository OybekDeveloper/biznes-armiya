import React from "react";
import './loader.css'
const Loader1 = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    </div>
  );
};

export default Loader1;
