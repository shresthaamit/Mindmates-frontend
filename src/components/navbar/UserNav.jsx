// components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NewNav.css";

const UserNav = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/"); // optional: go to home
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">
          <span className="logo-orange">Mind</span>{" "}
          <span className="logo-bold">Mates</span>
        </span>
        <ul className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/">Communities</Link>
          <li>Tags</li>
          <li>Users</li>
        </ul>
      </div>

      <div className="navbar-right">
        <input type="text" placeholder="🔍 Search..." className="search-bar" />
        <div className="profile">
          <Link to="/profile">
            <svg
              className="profile-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </Link>
        </div>
        <>
          <a
            className="nav-button"
            href="/"
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.href = "/";
            }}
          >
            Logout
          </a>
        </>
      </div>
    </nav>
  );
};

export default UserNav;
