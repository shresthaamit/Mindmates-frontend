import React, { useState } from "react";
import "./post.css";
import Button from "../Buttons/buttons";
const tabs = ["Recent Questions", "Popular", "Most Voted", "Most Visit"];

function QuestionTabs() {
  const [activeTab, setActiveTab] = useState("Recent Questions");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-section">
      <div className="tabs-container">
        <div className="tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <Button text="Write a Post" onClick={() => navigate("/post")} />
      </div>
    </div>
  );
}

export default QuestionTabs;
