import { Link } from "react-router-dom";
import "./navbar.css";
import mylogo from "../../assets/images/mylogo.png";
import "../Buttons/buttons.css";
function Navbar() {
  return (
    <div className="navbar-inner">
      <div className="logo">
        <img src={mylogo} alt="Logo" />
      </div>

      <div className="nav-bar">
        <div className="navlinks">
          <Link to="/">Home</Link>
          <Link to="/">Communities</Link>
          <input type="text" placeholder="Search..." className="search-bar" />
          <Link to="/login" className="nav-button">
            Login
          </Link>
          <Link to="/signup" className="write-btn">
            {/* <button className="">→ Write a Post</button> */}→ Signup
          </Link>
        </div>
        <div className="profile">
          <svg
            className="profile-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
