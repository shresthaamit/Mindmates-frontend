// components/common/Button.jsx
import React from "react";
import "./buttons.css";

const Button = ({ text, onClick, type = "button", styleClass = "" }) => {
  return (
    <button className={`main-btn ${styleClass}`} onClick={onClick} type={type}>
      → {text}
    </button>
  );
};

export default Button;
