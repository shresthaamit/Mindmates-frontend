import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section logo-area">
        <h2 className="logo">Mindmates</h2>
        <p>Join the Conversation</p>
        <p className="copyright">© Mindmates 2025. All rights reserved</p>
      </div>
      <div className="footer-section">
        <h4>Services</h4>
        <ul>
          <li>Communities</li>
          <li>Chat</li>
          <li>Questions</li>
          <li>Private Server</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Follow us</h4>
        <ul>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
          <li>
            <a href="#">LinkedIn</a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Contact us</h4>
        <p>mindmates@mail.com</p>
      </div>
    </footer>
  );
};
export default Footer;
