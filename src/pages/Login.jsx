import React, { useState, useEffect, useRef } from "react";
import "./AllCSS/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import js from "@eslint/js";

const Login = ({ setIsLoggedIn }) => {
  const loginRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    loginRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        email: formData.email,
        password: formData.password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      setIsLoggedIn(true);
      toast.success("Login Succeed");
      console.log("Login succeed", formData.email);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Login failed. Check email or password"
      );
    }
  };

  return (
    <>
      <div className="login-wrapper" ref={loginRef}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Log in to your account</h2>
          <p className="subtext">Welcome back! Please enter your details</p>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="youremail@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="password-group">
            <label>Password</label>
            <a href="#">Forgot password?</a>
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
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
