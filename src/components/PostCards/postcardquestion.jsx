import React, { useState } from "react";
import "./PostCard.css";
import data from "./data.json";
import Button from "../Buttons/buttons";
import Pagination from "../pagination/pagination";

const POSTS_PER_PAGE = 7;

const PostCard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = data.posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = data.posts.slice(start, end);

  return (
    <div className="discussion-wrapper">
      <div className="questionsection">
        {/* Paginated posts */}
        {paginatedPosts.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-header">
              <img className="avatar" src={post.image} alt="Author" />
              <div>
                <h4 className="author">
                  {post.author} · {post.date}
                </h4>
                <span className="category">In: {post.category}</span>
              </div>
            </div>
            <h2 className="question">{post.question}</h2>
            <div className="tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="actions">
              <button className="comment-button">
                💬 {post.comments} Comments
              </button>
              <span className="views">👁️ {post.views} views</span>
              <button className="add-comment">Add Comment</button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Communities Sidebar */}
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
        <Button text="Create community" onClick={() => navigate("/post")} />
      </div>
    </div>
  );
};

export default PostCard;
