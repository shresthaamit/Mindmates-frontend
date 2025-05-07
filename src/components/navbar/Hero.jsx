import React from "react";
import "./Hero.css";
import Hero from "../../assets/images/hero.png";
// Make sure this path is correct

function HeroSection() {
  return (
    <div className="hero">
      <div className="hero-top">
        <img src={Hero} alt="F1 Logo" className="hero-logo" />
        <div className="hero-content">
          <h1> Join the Conversation</h1>
          <p>
            Dive into discussions, ask questions, and share your knowledge with
            the Mindmates community. Whether you're exploring new ideas or
            helping others, every contribution counts.
          </p>
        </div>
      </div>
      <hr className="divider" />
      <div className="hero-stats">
        <div>
          <strong>Members</strong>
          <br />
          2,123
        </div>
        <div>
          <strong>Questions</strong>
          <br />
          22,102
        </div>
        <div>
          <strong>Discussions</strong>
          <br />
          254,123
        </div>
        <div>
          <strong>Images</strong>
          <br />
          5,123
        </div>
        <div>
          <strong>Admins</strong>
          <br />
          13
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
