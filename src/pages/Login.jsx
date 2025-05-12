import React from "react";
import "./AllCSS/login.css";

const Login = () => {
  return (
    <>
      <div className="login-wrapper">
        <form className="login-form">
          <h2>Log in to your account</h2>
          <p className="subtext">Welcome back! Please enter your details</p>
          <label>Email</label>
          <input type="email" placeholder="youremail@gmail.com" required />
          <div className="password-group">
            <label>Password</label>
            <a href="#">Forgot password?</a>
          </div>
          <input type="password" required />
          <div className="remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="remembertext">
              Remember me for 30 days
            </label>
          </div>
          <button type="submit" className="primary-btn">
            Sign in
          </button>

          <div className="social-buttons">
            <button className="social-btn google">Google</button>
            <button className="social-btn facebook">Facebook</button>
          </div>
          <p className="bottom-text">
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
