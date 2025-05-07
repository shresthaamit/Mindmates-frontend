import React from "react";
import Navbar from "./Navbar.jsx";
import HeroSection from "./Hero.jsx";
import "./navbar.css";
function AllNav() {
  return (
    <>
      <div className="fullnav">
        <nav className="navbar-container">
          <Navbar />
          <HeroSection />
        </nav>
      </div>
    </>
  );
}
export default AllNav;
