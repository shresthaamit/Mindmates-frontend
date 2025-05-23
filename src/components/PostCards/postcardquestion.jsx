import React, { useState, useEffect } from "react";
import "./PostCard.css";
import data from "./data.json";
import Button from "../Buttons/buttons";
import Pagination from "../pagination/pagination";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const POSTS_PER_PAGE = 7;

const PostCard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

          // Use the counts returned from backend if available
          // Otherwise fallback to local logic (safe fallback)
          const newUpvotes =
            typeof data.upvote_count === "number"
              ? data.upvote_count
              : post.upvote_count;
          const newDownvotes =
            typeof data.downvote_count === "number"
              ? data.downvote_count
              : post.downvote_count;

          // Determine new userVote based on status string
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

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, end);

  return (
    <div className="discussion-wrapper">
      <div className="questionsection">
        {paginatedPosts.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-header">
              <img className="avatar" src={post.image} alt="Author" />
              <div>
                <h4 className="author">
                  {post.user} · {new Date(post.created_at).toLocaleDateString()}
                </h4>
                <span className="category">Email: {post.user_email}</span>
              </div>
            </div>

            <h2 className="question">{post.title}</h2>

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

              <button className="comment-button">
                💬 {post.comments || 0} Comments
              </button>
              <button className="add-comment">Add Comment</button>
            </div>
          </div>
        ))}

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
