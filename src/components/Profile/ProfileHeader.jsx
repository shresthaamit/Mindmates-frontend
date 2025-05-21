import "./ProfileHeader.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateProfileInfo from "./UpdateUserInfo";
const ProfileHeader = () => {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const navigate = useNavigate();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Failed to parse JWT", e);
      return null;
    }
  };

  const decoded = parseJwt(accessToken);
  const userId = decoded?.user_id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/accounts/profile/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setProfile(res.data);

        const userRes = await axios.get(res.data.user, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userData = userRes.data;
        setUsername(userData.username);
        setEmail(userData.email);
        setName(`${userData.first_name} ${userData.last_name}`.trim());
        setDateJoined(userData.date_joined);
      } catch (error) {
        console.error("Error fetching profile or user:", error);
      }
    };

    if (userId && accessToken) {
      fetchProfile();
    }
  }, [userId, accessToken]);

  if (!profile) return <p>Loading profile...</p>;

  const imageUrl = profile.profile_picture?.startsWith("http")
    ? profile.profile_picture
    : `http://127.0.0.1:8000${profile.profile_picture}`;

  const formattedDate = new Date(dateJoined).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="profile-header">
      <div className="profile-left">
        {profile.profile_picture ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="avatar-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-avatar.png";
            }}
          />
        ) : (
          <div className="avatar-box">
            {username ? username[0].toUpperCase() : "?"}
          </div>
        )}
      </div>

      <div className="profile-center">
        <div className="profile-info">
          <h2>{name || username || "User not found"}</h2>
          <p className="job-title" class="mt-9">
            {email || "No email"}
          </p>
          <p className="member-location">
            <b>Member since :</b>
            {formattedDate}
          </p>
        </div>

        <div className="stats">
          <span>42 Questions</span>
          <span>156 Answers</span>
          <span>5 Gold</span>
          <span>24 Silver</span>
          <span>78 Bronze</span>
        </div>
      </div>

      <div className="buttons">
        {showUpdateModal && (
          <UpdateProfileInfo
            userId={userId}
            email={email}
            onClose={() => setShowUpdateModal(false)}
          />
        )}
        <button className="btn-dark" onClick={() => setShowUpdateModal(true)}>
          ✏️ Update Profile Info
        </button>
        <button className="btn-primary">📷 Update Profile Picture</button>
      </div>
    </div>
  );
};

export default ProfileHeader;
