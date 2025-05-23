import React, { useState, useEffect } from "react";
import "./TopQuestionHeader.css";
import { Link } from "react-router-dom";
const TopQuestionsHeader = () => {
  const [questionCount, setQuestionCount] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      const fetchQuestionCount = async () => {
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/querymate/questions/total_count/"
          );
          const data = await response.json();
          setQuestionCount(data.total_questions);
        } catch (error) {
          console.error("Failed to fetch question count:", error);
        }
      };
      fetchQuestionCount();
    }
  }, []);

  return (
    <div className="top-questions-header">
      <div className="header-left">
        <h1>Total Questions</h1>
        <span className="question-count">
          {questionCount !== null ? `${questionCount} questions` : "Loading..."}
        </span>
      </div>
      <div className="header-right">
        <Link to="/askquestion" className="ask-btn">
          Ask Question
        </Link>
      </div>
    </div>
  );
};

export default TopQuestionsHeader;
