import React from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found fixed top-0 left-0 bg-white z-[1200] w-screen h-screen">
      <main className="bsod container">
        <h1 className="neg title">
          <span className="bg">Error - 404</span>
        </h1>
        <p>An error has occured, to continue:</p>
        <p>
          * Return to our homepage.
          <br />* Send us an e-mail about this error and try later.
        </p>
        <nav className="nav">
         <NavLink to={'/'}>Dashboard</NavLink>
          &nbsp;|&nbsp;
          <a href="#" className="link">
            webmaster
          </a>
        </nav>
      </main>
    </div>
  );
};

export default NotFound;
