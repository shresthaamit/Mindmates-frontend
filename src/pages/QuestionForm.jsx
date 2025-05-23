import React, { useState, useEffect } from "react";
import "./AllCSS/Askquestion.css";
import { Link } from "react-router-dom";
import Button from "../components/Buttons/buttons.jsx";
export default function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/querymate/tags/")
      .then((res) => res.json())
      .then(setTags);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);
    selectedTags.forEach((tagId) => formData.append("tag_ids", tagId));

    const response = await fetch("http://127.0.0.1:8000/questions/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="ask-question-wrapper">
      <form onSubmit={handleSubmit} className="ask-question-form">
        {/* <Link to="/" className="link-btn">
           Back to Home
        </Link> */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g: Queries regarding Email validation"
            required
          />
        </div>

        <div className="form-group">
          <label>What are the details of your problem?</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain your problem in detail.."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="custom-dropdown">
            <div className="selected-tags">
              {selectedTags.map((id) => {
                const tag = tags.find((t) => t.id.toString() === id.toString());
                return (
                  <span key={id} className="tag-chip">
                    {tag?.name}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedTags(
                          selectedTags.filter((tagId) => tagId !== id)
                        )
                      }
                      className="remove-tag"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (value && !selectedTags.includes(value)) {
                  setSelectedTags([...selectedTags, value]);
                }
                e.target.value = ""; // Reset dropdown selection
              }}
            >
              <option value="">Select tag</option>
              {tags
                .filter((tag) => !selectedTags.includes(tag.id.toString()))
                .map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            className="discard-btn"
            onClick={() => {
              setTitle("");
              setDescription("");
              setSelectedTags([]);
              setImage(null);
            }}
          >
            Discard Draft
          </button>
          <button type="submit" className="submit-btn">
            Submit your question
          </button>
        </div>
      </form>
    </div>
  );
}
