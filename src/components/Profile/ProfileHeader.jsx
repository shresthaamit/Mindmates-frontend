// components/ProfileHeader.jsx
import "./ProfileHeader.css";

const ProfileHeader = () => (
  <div className="profile-header">
    <div className="avatar">
      <div className="avatar-box">JS</div>
    </div>
    <div className="profile-info">
      <h2>John Smith</h2>
      <p className="job-title">TitleJOB</p>
      <p className="member-location">Member since May 2023 • Address</p>
      <div className="stats">
        <span>1,234 Reputation</span>
        <span>42 Questions</span>
        <span>156 Answers</span>
        <span>5 Gold</span>
        <span>24 Silver</span>
        <span>78 Bronze</span>
      </div>
    </div>
    <div className="buttons">
      <button className="gray">Update Profile Info</button>
      <button className="blue">Update Profile Picture</button>
    </div>
  </div>
);

export default ProfileHeader;
