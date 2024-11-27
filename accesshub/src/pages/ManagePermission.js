import React, { useState, useEffect } from "react";

const ManagePermissions = () => {
  const [users, setUsers] = useState([]); 
  const [filters, setFilters] = useState({ role: "", username: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) =>
        setUsers(
          data.map((user) => ({
            ...user,
            permissions: user.permissions || { view: false, edit: false, delete: false },
          }))
        )
      )
      .catch((err) => setError(err.message));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredUsers = users.filter((user) => {
    const { role, username } = filters;
    return (
      (!role || user.role === role) &&
      (!username || user.name.toLowerCase().includes(username.toLowerCase()))
    );
  });

  const handlePermissionChange = (userId, permission) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              permissions: {
                ...user.permissions,
                [permission]: !user.permissions[permission],
              },
            }
          : user
      )
    );
  };
  const handleSavePermissions = (user) => {
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update permissions");
        }
        return res.json();
      })
      .then((updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        alert(`Permissions updated for ${user.name}`);
      })
      .catch((err) => {
        setError(`Failed to update permissions for ${user.name}: ${err.message}`);
      });
  };
  

  return (
    <div className="permissions-page">
      <h1 className="permissions-header">Manage Permissions</h1>

      {/* Filters */}
      <div className="permissions-filters">
        <label htmlFor="role-filter">Role:</label>
        <select
          id="role-filter"
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
        >
          <option value="">--Select Role--</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>

        <label htmlFor="user-filter">User:</label>
        <input
          type="text"
          id="user-filter"
          name="username"
          placeholder="Enter Username"
          value={filters.username}
          onChange={handleFilterChange}
        />

        <button type="button" onClick={() => console.log("Filters applied")}>
          Apply Filters
        </button>
      </div>

      <div className="permissions-table">
        {error && <p className="error-message">{error}</p>}
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      checked={user.permissions?.view || false}
                      onChange={() => handlePermissionChange(user.id, "view")}
                    />
                    View
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={user.permissions?.edit || false}
                      onChange={() => handlePermissionChange(user.id, "edit")}
                    />
                    Edit
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={user.permissions?.delete || false}
                      onChange={() => handlePermissionChange(user.id, "delete")}
                    />
                    Delete
                  </label>
                </td>
                <td>
                  <button
                    className="save-btn"
                    onClick={() => handleSavePermissions(user)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePermissions;
