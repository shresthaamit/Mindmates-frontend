import React, { useState, useEffect } from "react";
import "./PostCard.css";
import data from "./data.json";
import Button from "../Buttons/buttons";
import Pagination from "../pagination/pagination";
import { FaArrowUp, FaArrowDown, FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const POSTS_PER_PAGE = 7;

const PostCard = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setLoggedInUserId(decoded.user_id);
        console.log(typeof decoded.user_id);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-container")) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/querymate/questions/"
      );
      const data = await response.json();
      const updated = data.map((post) => ({
        ...post,
        userVote: null, // Ideally fetched from backend if supported
        upvote_count: post.upvote_count || 0,
        downvote_count: post.downvote_count || 0,
        showMenu: false,
      }));
      setPosts(updated);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleVote = async (postId, type) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const apiUrl = `http://127.0.0.1:8000/querymate/questions/${postId}/${
        type === "up" ? "upvote" : "downvote"
      }/`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Vote failed");

      const data = await response.json(); // should return status, upvote_count, downvote_count

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id !== postId) return post;

          const newUpvotes =
            typeof data.upvote_count === "number"
              ? data.upvote_count
              : post.upvote_count;
          const newDownvotes =
            typeof data.downvote_count === "number"
              ? data.downvote_count
              : post.downvote_count;

          let newUserVote = post.userVote;
          if (
            data.status === "Upvote removed" ||
            data.status === "Downvote removed"
          ) {
            newUserVote = null;
          } else if (data.status === "Question upvoted") {
            newUserVote = "up";
          } else if (data.status === "Question downvoted") {
            newUserVote = "down";
          }

          return {
            ...post,
            upvote_count: Math.max(0, newUpvotes),
            downvote_count: Math.max(0, newDownvotes),
            userVote: newUserVote,
          };
        })
      );
    } catch (error) {
      console.error("Error toggling vote:", error);
    }
  };

  const toggleMenu = (postId) => {
    setMenuOpenId((prev) => (prev === postId ? null : postId));
  };

  // Start editing
  const startEditing = (post) => {
    navigate(`/askquestion/${post.id}`, { state: { post } });
  };
  // Delete post
  const deletePost = async (postId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/querymate/questions/${postId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete post");

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      setMenuOpenId(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, end);

  return (
    <div className="discussion-wrapper">
      <div className="questionsection">
        {paginatedPosts.map((post) => {
          // Debug logging if needed
          console.log(
            "post.author_id:",
            post.author_id,
            "loggedInUserId:",
            loggedInUserId
          );

          return (
            <div className="post-card" key={post.id}>
              <div className="post-header">
                <img className="avatar" src={post.image} alt="Author" />
                <div>
                  <h4 className="author">
                    {post.user} ·{" "}
                    {new Date(post.created_at).toLocaleDateString()}
                  </h4>
                  <span className="category">Email: {post.user_email}</span>
                </div>
                {post.author_id === loggedInUserId && (
                  <div className="menu-container">
                    <button
                      className="menu-button"
                      onClick={() => toggleMenu(post.id)}
                    >
                      <FaEllipsisV />
                    </button>

                    {menuOpenId === post.id && (
                      <div className="menu-dropdown">
                        <button onClick={() => startEditing(post)}>
                          ✏️ Edit
                        </button>
                        <button onClick={() => deletePost(post.id)}>
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {editingPostId === post.id ? (
                <div>
                  <textarea
                    className="edit-textarea"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    rows={3}
                  />
                  <div className="edit-actions">
                    <button
                      className="save-btn"
                      onClick={() => saveEdit(post.id)}
                      disabled={!editTitle.trim()}
                    >
                      Save
                    </button>
                    <button className="cancel-btn" onClick={cancelEditing}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <h2 className="question">{post.title}</h2>
              )}

              <div className="tags">
                {post.tags.map((tag) => (
                  <span key={tag.id} className="tag">
                    {tag.name}
                  </span>
                ))}
              </div>

              <div className="actions">
                <div className="votes">
                  <button
                    className={`vote-button upvote ${
                      post.userVote === "up" ? "active" : ""
                    }`}
                    onClick={() => handleVote(post.id, "up")}
                  >
                    <FaArrowUp />
                  </button>
                  <span className="vote-count">
                    {post.upvote_count - post.downvote_count}
                  </span>
                  <button
                    className={`vote-button downvote ${
                      post.userVote === "down" ? "active" : ""
                    }`}
                    onClick={() => handleVote(post.id, "down")}
                  >
                    <FaArrowDown />
                  </button>
                </div>
                {/* <button className="comment-button"> */}
                💬 {post.answer_count || 0} Answers
                {/* </button> */}
                <Link to={`/question/${post.id}`} className="add-comment">
                  Add Answer
                </Link>
              </div>
            </div>
          );
        })}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <div className="communities-section">
        <h6>Similar Communities</h6>
        {data.communities.map((community, index) => (
          <div className="community" key={index}>
            <img src={community.logo} alt={community.name} />
            <div>
              <p>{community.name}</p>
              <p>{community.followers} followers</p>
            </div>
          </div>
        ))}
        <Button
          text="Create community"
          onClick={() => (window.location.href = "/post")}
        />
      </div>
    </div>
  );
};

export default PostCard;
