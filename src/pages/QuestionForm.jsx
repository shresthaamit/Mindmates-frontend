import React, { useState, useEffect } from "react";
import "./AllCSS/Askquestion.css";
import Button from "../components/Buttons/buttons.jsx";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function AskQuestion() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const editingPost = location.state?.post || null;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(
    editingPost?.tags.map((tag) => tag.id.toString()) || []
  );
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/querymate/tags/")
      .then((res) => res.json())
      .then(setTags);
  }, []);
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || "");
      setDescription(editingPost.description || "");
      setImage(null); // for uploading a new image
      setImagePreview(editingPost.image || null); // ✅ show existing image
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);
    selectedTags.forEach((tagId) => formData.append("tag_ids", tagId));

    const token = localStorage.getItem("accessToken");
    const endpoint = editingPost
      ? `http://127.0.0.1:8000/querymate/questions/${editingPost.id}/`
      : "http://127.0.0.1:8000/querymate/questions/";

    const response = await fetch(endpoint, {
      method: editingPost ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const text = await response.text();
      console.error("Error response text:", text);
      alert("Something went wrong: " + response.status);
      return;
    }
    const result = await response.json();
    console.log(result);

    if (response.ok) {
      navigate("/"); // or show a success message
    } else {
      alert("Something went wrong while submitting the form.");
    }
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

          {imagePreview && (
            <div className="image-preview">
              <p>Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "300px", marginBottom: "10px" }}
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              if (file) {
                setImagePreview(URL.createObjectURL(file));
              } else {
                setImagePreview(null);
              }
            }}
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
