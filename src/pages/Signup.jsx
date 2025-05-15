import React, { useState, useEffect, useRef } from "react";
import "./AllCSS/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// import { useEffect } from "react";

const Signup = () => {
  const signupRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    agree: false,
  });
  useEffect(() => {
    signupRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      toast.error("You must agree to the terms.");
      return;
    }
    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/users/",
        payload
      );
      if (response.status === 201 || response.status === 200) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.email?.[0] ||
        error.response?.data?.detail ||
        "Signup failed.";
      toast.error(errMsg);
    }
  };

  return (
    <>
      <div className="signup-container" ref={signupRef}>
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          <p className="subtitle">
            Join the community to ask and answer questions
          </p>

          <div className="name-fields">
            <div>
              <label>First name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Last name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <small>
            Password must be at least 8 characters and include a number and a
            special character
          </small>

          <div className="checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label className="labelName">
              I agree to the <a href="#">terms of service</a> and{" "}
              <a href="#">privacy policy</a>
            </label>
          </div>
          <button type="submit" className="signup-button">
            Sign up
          </button>
          <p className="signin-link">
            Already have an account? <a href="#">Sign in</a>
          </p>
        </form>
      </div>
    </>
  );
};
export default Signup;
