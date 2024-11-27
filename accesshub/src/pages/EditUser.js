import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      alert("User updated successfully");
      navigate("/Dashboard"); 
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="edit-user-container">
      <h2 className="edit-user-heading">Edit User</h2>
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <label className="edit-user-label">
          Name:
          <input
            type="text"
            className="edit-user-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="edit-user-label">
          Email:
          <input
            type="email"
            className="edit-user-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="edit-user-label">
          Role:
          <select
            className="edit-user-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">--Select Role--</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </label>
        <button type="submit" className="edit-user-submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
