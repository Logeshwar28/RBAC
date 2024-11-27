import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleEdit = (userId) => {
    navigate(`/Edituser/${userId}`);
  };
  const handleDelete = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        await fetch(`http://localhost:3000/users/${userId}`, {
          method: "DELETE",
        });
        setUsers(users.filter((user) => user.id !== userId));
        alert("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, Admin!</h1>
        <p>Manage access seamlessly with Access-Hub.</p>
      </header>
      <div className="quick-actions">
        <button className="action-btn">
          <Link to="/Adduser">Add New User</Link>
        </button>
        <button className="action-btn"><Link to="/Viewaudit">View Audit</Link></button>
        <button className="action-btn"><Link to="/Managepermission">Manage Permissions</Link></button>
      </div>

      <div className="stats-overview">
        <div className="stats-card">Total Users: {users.length}</div>
        <div className="stats-card">Roles: 4</div> 
        <div className="stats-card">Pending Requests: 2</div>
        <div className="stats-card">Last Login: Today</div>
      </div>

      <div className="user-table-container">
        <h2 className="user-table-title">User List</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(user.id)}>Edit</button>
                    <button className="delete-btn" onClick={()=>handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
