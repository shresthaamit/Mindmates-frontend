import React, { useState } from "react";
import axios from "axios";
import "./UpdateUserInfo.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const UpdateProfileInfo = ({ userId, email, onClose }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!oldPassword) {
      setError("Current Password is required");
      return;
    }
    try {
      await axios.patch(
        `http://127.0.0.1:8000/accounts/users/${userId}/`,
        {
          first_name: firstName,
          last_name: lastName,
          old_password: oldPassword,
          password: newPassword || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Update failed:", err.response || err);

      toast.error(
        "Failed to update profile. Check current password and try again."
      );
    }
  };
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="light"
          style={{ zIndex: 2001 }} // Ensure it's above modal content
        />
        <h2>Update Profile Info</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="email"
            value={email}
            disabled
            style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
          />
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <hr />
          <input
            type="password"
            placeholder="Current password (required)"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New password (optional)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
        {error && <p className="message error">{error}</p>}
        {message && <p className="message success">{message}</p>}
      </div>
    </div>
  );
};
export default UpdateProfileInfo;
