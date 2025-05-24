import React, { useEffect, useState } from "react";
import "./AnswerForm.css";

const AnswerForm = ({ questionId, token }) => {
  const [content, setContent] = useState("");
  const [answerUrl, setAnswerUrl] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setMessage("Answer content is required.");
      return;
    }
    const formData = new FormData();
    formData.append("content", content);
    if (answerUrl) formData.append("answerurl", answerUrl);
    if (image) formData.append("image", image);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/querymate/questions/${questionId}/answers/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage("Answer submitted successfully.");
        setContent("");
        setAnswerUrl("");
        setImage(null);
      } else {
        setMessage(data.detail || "Error submitting answer.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };
  return (
    <form className="answer-form" onSubmit={handleSubmit}>
      <h3>Submit Your Answer</h3>
      {message && <p className="message">{message}</p>}
      <textarea
        placeholder="write your anwser"
        name=""
        id=""
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <input
        type="url"
        placeholder="Optional: Add a URL"
        value={answerUrl}
        onChange={(e) => setAnswerUrl(e.target.value)}
      ></input>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="cancel">Cancel</button>
      <button type="submit">Post Answer</button>
    </form>
  );
};
export default AnswerForm;
