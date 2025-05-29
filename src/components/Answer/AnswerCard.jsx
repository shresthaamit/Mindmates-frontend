import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AnswerCard.css";

const AnswerList = ({ questionId, accessToken }) => {
  const [answers, setAnswers] = useState([]);
  const [reviewInputs, setReviewInputs] = useState({});
  const [showReviewForm, setShowReviewForm] = useState({});
  const [editingReviewIdMap, setEditingReviewIdMap] = useState({});
  const [modalImage, setModalImage] = useState(null);
  const [openMenuReviewId, setOpenMenuReviewId] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/querymate/questions/${questionId}/answers/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch answers");
        const data = await res.json();
        setAnswers(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load answers");
      }
    };
    fetchAnswers();
  }, [questionId]);

  const toggleReviewForm = (answerId) => {
    setShowReviewForm((prev) => ({
      ...prev,
      [answerId]: !prev[answerId],
    }));

    // Reset editingReviewId and input if closing form
    if (showReviewForm[answerId]) {
      setEditingReviewIdMap((prev) => ({
        ...prev,
        [answerId]: null,
      }));
      setReviewInputs((prev) => ({
        ...prev,
        [answerId]: "",
      }));
    }
  };

  const handleReviewChange = (answerId, value) => {
    setReviewInputs((prev) => ({ ...prev, [answerId]: value }));
  };

  const submitReview = async (answerId) => {
    const reviewText = reviewInputs[answerId];
    if (!reviewText?.trim()) {
      toast.warn("Review cannot be empty");
      return;
    }

    const editingReviewId = editingReviewIdMap[answerId];
    const isEdit = !!editingReviewId;

    try {
      const endpoint = isEdit
        ? `http://localhost:8000/querymate/questions/${questionId}/answers/${answerId}/reviews/${editingReviewId}/`
        : `http://localhost:8000/querymate/questions/${questionId}/answers/${answerId}/reviews/`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content: reviewText }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Review submission failed:", errorData);
        toast.error(errorData.detail || "Failed to submit review");
        return;
      }

      const updatedReview = await res.json();

      setAnswers((prevAnswers) =>
        prevAnswers.map((ans) =>
          ans.id === answerId
            ? {
                ...ans,
                review_answers: isEdit
                  ? ans.review_answers.map((r) =>
                      r.id === updatedReview.id ? updatedReview : r
                    )
                  : [...(ans.review_answers || []), updatedReview],
              }
            : ans
        )
      );

      setReviewInputs((prev) => ({ ...prev, [answerId]: "" }));
      setEditingReviewIdMap((prev) => ({ ...prev, [answerId]: null }));
      setShowReviewForm((prev) => ({ ...prev, [answerId]: false }));
      toast.success(
        isEdit ? "Review updated successfully" : "Review posted successfully"
      );
    } catch (error) {
      console.error(error);
      toast.error("Error submitting review");
    }
  };

  const deleteReview = async (answerId, reviewId) => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;

    try {
      const res = await fetch(
        `http://localhost:8000/querymate/questions/${questionId}/answers/${answerId}/reviews/${reviewId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.ok) {
        setAnswers((prevAnswers) =>
          prevAnswers.map((ans) =>
            ans.id === answerId
              ? {
                  ...ans,
                  review_answers: ans.review_answers.filter(
                    (r) => r.id !== reviewId
                  ),
                }
              : ans
          )
        );

        setShowReviewForm((prev) => ({ ...prev, [answerId]: false }));
        setEditingReviewIdMap((prev) => ({ ...prev, [answerId]: null }));
        setReviewInputs((prev) => ({ ...prev, [answerId]: "" }));

        toast.success("Review deleted successfully");
      } else {
        console.error("Delete failed");
        toast.error("Failed to delete review");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting review");
    }
  };

  const handleVote = async (answerId, type) => {
    try {
      const res = await fetch(
        `http://localhost:8000/querymate/questions/${questionId}/answers/${answerId}/${type}/`,
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
          prev.map((ans) =>
            ans.id === answerId
              ? {
                  ...ans,
                  upvote_count: updatedAnswer.upvote_count,
                  downvote_count: updatedAnswer.downvote_count,
                }
              : ans
          )
        );
        toast.success(`You ${type}d this answer`);
      } else {
        toast.error("Failed to submit vote");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error voting");
    }
  };

  return (
    <div className="answer-list">
      <h2>Answers</h2>
      {answers.length === 0 && (
        <p className="empty-msg">No answers yet. Be the first to reply!</p>
      )}

      {answers.map((answer) => {
        const userReview = (answer.review_answers || []).find(
          (r) => r.is_owner
        );

        return (
          <div className="answer-card" key={answer.id}>
            <div className="answer-top">
              <span className="user-tag">
                Posted by <b>{answer.user || "Unknown"}</b>
              </span>
              <div className="vote-box">
                <button onClick={() => handleVote(answer.id, "upvote")}>
                  👍 {answer.upvote_count ?? 0}
                </button>
                <button onClick={() => handleVote(answer.id, "downvote")}>
                  👎 {answer.downvote_count ?? 0}
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
              <div className="answer-body">
                {answer.content || "No content provided."}
              </div>
            </div>

            <div className="reviews">
              <h4>Reviews:</h4>
              {Array.isArray(answer.review_answers) &&
              answer.review_answers.length > 0 ? (
                <ul>
                  {answer.review_answers.map((review) => (
                    <li key={review.id}>
                      <b>{review.user || "User"}:</b> {review.content}
                      {review.is_owner && (
                        <div className="review-menu-wrapper">
                          <button
                            className="hamburger-btn"
                            onClick={() =>
                              setOpenMenuReviewId((prev) =>
                                prev === review.id ? null : review.id
                              )
                            }
                          >
                            ⋮
                          </button>
                          {openMenuReviewId === review.id && (
                            <div className="dropdown-menu">
                              <button
                                onClick={() => {
                                  handleReviewChange(answer.id, review.content);
                                  toggleReviewForm(answer.id);
                                  setEditingReviewIdMap((prev) => ({
                                    ...prev,
                                    [answer.id]: review.id,
                                  }));
                                  setOpenMenuReviewId(null);
                                }}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => {
                                  deleteReview(answer.id, review.id);
                                  setOpenMenuReviewId(null);
                                }}
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-reviews">No reviews yet.</p>
              )}

              {accessToken && !userReview && !showReviewForm[answer.id] && (
                <button
                  onClick={() => toggleReviewForm(answer.id)}
                  className="review-toggle"
                >
                  Write a review
                </button>
              )}

              {showReviewForm[answer.id] && (
                <div className="review-form">
                  <textarea
                    placeholder="Write your review..."
                    value={reviewInputs[answer.id] || ""}
                    onChange={(e) =>
                      handleReviewChange(answer.id, e.target.value)
                    }
                  />
                  <div>
                    <button onClick={() => submitReview(answer.id)}>
                      {editingReviewIdMap[answer.id] ? "Update" : "Submit"}
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        toggleReviewForm(answer.id);
                        setEditingReviewIdMap((prev) => ({
                          ...prev,
                          [answer.id]: null,
                        }));
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {!accessToken && (
                <p className="login-hint">🔒 Login to write a review</p>
              )}
            </div>
          </div>
        );
      })}

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
