import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;
      const nextId = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;

      const newUser = { ...formData, id: nextId };
      const res = await axios.post('http://localhost:3000/users', newUser);
      
      if (res.status === 201) {
        console.log('User added:', res.data);
        alert('User added successfully!');
      }
    } catch (err) {
      console.error('Error adding user:', err);
    }
    navigate('/Dashboard');
  };

  return (
    <div className="add-user-container">
      <h2>Add New User</h2>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Role:
          <select
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
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
