import { Link } from "react-router-dom";
import "./navbar.css";
import mylogo from "../../assets/images/mylogo.png";

function Navbar() {
  return (
    <div className="navbar-inner">
      <div className="logo">
        <img src={mylogo} alt="Logo" />
      </div>

      <div className="nav-bar">
        <div className="navlinks">
          <Link to="/">Home</Link>

          <input type="text" placeholder="Search..." className="search-bar" />
          <Link to="/login" className="nav-button">
            Login
          </Link>
          <Link to="/signup" className="nav-button">
            Signup
          </Link>
        </div>
        <div className="profile">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.9 122.9"
            className="profile-svg"
          >
            <g>
              <path d="M61.4,0c17,0,32.3,6.9,43.4..." />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
