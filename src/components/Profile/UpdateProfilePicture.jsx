import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "./UpdateUserInfo.css";
import { useState } from "react";
const UpdateProfilePicture = ({
  profileId,
  currentPicture,
  onClose,
  onPictureUpdated,
}) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(currentPicture);

  const accessToken = localStorage.getItem("accessToken");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please choose a new profile picture.");
      return;
    }
    const formData = new FormData();
    formData.append("profile_picture", image);

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/accounts/profile/${profileId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile picture updated!");
      if (res.data.profile_picture) {
        const absoluteUrl = res.data.profile_picture.startsWith("http")
          ? res.data.profile_picture
          : `http://127.0.0.1:8000${res.data.profile_picture}`;
        onPictureUpdated(absoluteUrl);
      }
      setTimeout(() => {
        onClose();
        // window.location.reload();
      }, 2000); // To show updated image
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error("Failed to update profile picture.");
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
        <h2>Update Profile Picture</h2>

        <form onSubmit={handleSubmit}>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "1rem",
              }}
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className="modal-buttons">
            <button type="submit" className="btn-primary">
              Save Picture
            </button>
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateProfilePicture;
