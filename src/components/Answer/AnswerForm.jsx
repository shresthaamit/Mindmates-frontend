import React, { useEffect, useState, useRef } from "react";
import "./AnswerForm.css";
import { toast } from "react-toastify";
const AnswerForm = ({ questionId, accessToken }) => {
  const [content, setContent] = useState("");
  const [answerUrl, setAnswerUrl] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const imageInputRef = useRef(null);
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
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        showMessage("✅ Answer submitted successfully!", "success");
        setContent("");
        setAnswerUrl("");
        setImage(null);
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
      } else {
        showMessage(data.detail || "Error submitting answer.", "error");
      }
    } catch (error) {
      showMessage("Something went wrong.", "error");
    }
  };
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType("");
    }, 2000); // clear after 2 seconds
  };
  return (
    <form className="answer-form" onSubmit={handleSubmit}>
      <h3>Submit Your Answer</h3>
      {message && (
        <div className={`inline-toast ${messageType}`}>{message}</div>
      )}
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
        ref={imageInputRef}
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button
        type="button"
        onClick={() => {
          setContent("");
          setAnswerUrl("");
          setImage(null);
          setMessage("");
          if (imageInputRef.current) {
            imageInputRef.current.value = "";
          }
        }}
      >
        Cancel
      </button>
      <button type="submit">Post Answer</button>
    </form>
  );
};
export default AnswerForm;
