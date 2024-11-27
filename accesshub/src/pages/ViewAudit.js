import React, { useState, useEffect } from 'react';

const ViewAudit = () => {
  const [logs, setLogs] = useState([]); 
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    userName: '',
    actionType: '',
  });
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:3000/auditLogs") 
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch audit logs");
        }
        return res.json();
      })
      .then((data) => setLogs(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredLogs = logs.filter((log) => {
    const { startDate, endDate, userName, actionType } = filters;
    const logDate = new Date(log.date);

    return (
      (!startDate || new Date(startDate) <= logDate) &&
      (!endDate || new Date(endDate) >= logDate) &&
      (!userName || log.user.toLowerCase().includes(userName.toLowerCase())) &&
      (!actionType || log.action === actionType)
    );
  });

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="audit-page">
      <h1>Audit Log</h1>
      <div className="audit-filters">
        <label htmlFor="start-date">Date Range:</label>
        <input
          type="date"
          id="start-date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          id="end-date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
        />

        <label htmlFor="user-name">User:</label>
        <input
          type="text"
          id="user-name"
          name="userName"
          placeholder="Enter User Name"
          value={filters.userName}
          onChange={handleFilterChange}
        />

        <label htmlFor="action-type">Action:</label>
        <select
          id="action-type"
          name="actionType"
          value={filters.actionType}
          onChange={handleFilterChange}
        >
          <option value="">--Select Action--</option>
          <option value="Login">Login</option>
          <option value="Logout">Logout</option>
          <option value="Create">Create</option>
          <option value="Update">Update</option>
          <option value="Delete">Delete</option>
        </select>

        <button type="button" onClick={() => setCurrentPage(1)}>
          Apply Filters
        </button>
      </div>

      <div className="audit-log-table">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>{new Date(log.date).toLocaleString()}</td>
                  <td>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewAudit;
