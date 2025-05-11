import React, { useState } from "react";
import "./AllCSS/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const handleChange = (e) => {
    const { name, value, type, change } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.agree) {
      alert("You must agree to the terms.");
      return;
    }
    // Submit logic here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <div className="signup-container">
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
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
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
          <label>Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label>
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
