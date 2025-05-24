import React, { useState, useEffect } from "react";
import AnswerForm from "../components/Answer/AnswerForm";
import { useParams } from "react-router-dom";
import "./AllCSS/QuestionDetail.css";
const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/querymate/questions/${id}/`
      );
      const data = await res.json();
      setQuestion(data);
    };
    fetchQuestion();
  }, [id]);
  if (!question) return <div>Loading...</div>;
  return (
    <>
      <div className="question-detail-container">
        {question.image && (
          <div className="question-image-wrapper">
            <img
              src={question.image}
              alt="Question"
              className="question-image"
            />
          </div>
        )}
        <h1 className="question-title">{question.title}</h1>
        <div className="question-meta">
          <span>
            Asked on: {new Date(question.created_at).toLocaleDateString()}
          </span>
          <span>
            {" "}
            · Updated: {new Date(question.updated_at).toLocaleDateString()}
          </span>
          <span>
            {" "}
            · By: {question.user} ({question.user_email})
          </span>
        </div>
        <div className="question-description">
          <p>{question.description}</p>
        </div>
        <div className="question-tags">
          {question.tags.map((tag) => (
            <span className="tag" key={tag.id}>
              {tag.name}
            </span>
          ))}
        </div>
      </div>
      <AnswerForm />
    </>
  );
};

export default QuestionDetail;
