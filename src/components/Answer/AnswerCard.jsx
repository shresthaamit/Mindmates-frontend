import React, { useEffect, useState } from "react";
import "./AnswerCard.css";

const AnswerList = ({ questionId, accessToken }) => {
  const [answers, setAnswers] = useState([]);
  const [reviewInputs, setReviewInputs] = useState({});
  const [showReviewForm, setShowReviewForm] = useState({});
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/querymate/questions/${questionId}/answers/`
        );
        if (!res.ok) throw new Error("Failed to fetch answers");
        const data = await res.json();
        setAnswers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAnswers();
  }, [questionId]);

  const toggleReviewForm = (answerId) => {
    setShowReviewForm((prev) => ({
      ...prev,
      [answerId]: !prev[answerId],
    }));
  };

  const handleReviewChange = (answerId, value) => {
    setReviewInputs((prev) => ({ ...prev, [answerId]: value }));
  };

  const submitReview = async (answerId) => {
    const reviewText = reviewInputs[answerId];
    if (!reviewText?.trim()) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/querymate/answers/${answerId}/reviews/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ content: reviewText }),
        }
      );

      if (res.ok) {
        const updatedAnswer = await res.json();
        setAnswers((prev) =>
          prev.map((ans) =>
            ans.id === answerId
              ? { ...ans, review_answers: updatedAnswer.review_answers }
              : ans
          )
        );
        setReviewInputs((prev) => ({ ...prev, [answerId]: "" }));
        setShowReviewForm((prev) => ({ ...prev, [answerId]: false }));
      } else {
        console.error("Review submission failed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (answerId, type) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/querymate/answers/${answerId}/${type}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.ok) {
        const updatedAnswer = await res.json();
        setAnswers((prev) =>
          prev.map((ans) => (ans.id === answerId ? updatedAnswer : ans))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="answer-list">
      <h2>Answers</h2>

      {answers.length === 0 && (
        <p className="empty-msg">No answers yet. Be the first to reply!</p>
      )}

      {answers.map((answer) => (
        <div className="answer-card" key={answer.id}>
          <div className="answer-top">
            <span className="user-tag">
              Posted by <b>{answer.user}</b>
            </span>
            <div className="vote-box">
              <button onClick={() => handleVote(answer.id, "upvote")}>
                👍 {answer.upvote_count}
              </button>
              <button onClick={() => handleVote(answer.id, "downvote")}>
                👎 {answer.downvote_count}
              </button>
            </div>
          </div>
          <div className="answer-div">
            {answer.image && (
              <div className="image-box">
                <img
                  src={answer.image}
                  alt="answer"
                  onClick={() => setModalImage(answer.image)}
                />
              </div>
            )}
            <div className="answer-body">{answer.content}</div>
          </div>
          <div className="reviews">
            <h4>Reviews:</h4>
            {answer.review_answers.length > 0 ? (
              <ul>
                {answer.review_answers.map((review, i) => (
                  <li key={i}>{review.content}</li>
                ))}
              </ul>
            ) : (
              <p className="no-reviews">No reviews yet.</p>
            )}

            {accessToken ? (
              !showReviewForm[answer.id] ? (
                <button
                  onClick={() => toggleReviewForm(answer.id)}
                  className="review-toggle"
                >
                  Write a review
                </button>
              ) : (
                <div className="review-form">
                  <textarea
                    placeholder="Write your thoughts..."
                    value={reviewInputs[answer.id] || ""}
                    onChange={(e) =>
                      handleReviewChange(answer.id, e.target.value)
                    }
                  />
                  <div>
                    <button onClick={() => submitReview(answer.id)}>
                      Submit
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => toggleReviewForm(answer.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )
            ) : (
              <p className="login-hint">🔒 Login to write a review</p>
            )}
          </div>
        </div>
      ))}

      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="zoom" />
            <button className="close-btn" onClick={() => setModalImage(null)}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerList;
