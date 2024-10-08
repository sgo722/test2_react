import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // Fetch users from API
  const getUsers = async () => {
    try {
      const response = await axios.get('https://apitestprojects.ttalkak.com/user');
      setUsers(response.data);
    } catch (e) {
      setError('Failed to fetch users');
    }
  };

  // Create new user
  const createUser = async () => {
    try {
      const response = await axios.post('https://apitestprojects.ttalkak.com/user', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: '', password: '' });  // Clear form
    } catch (e) {
      setError('Failed to create user');
    }
  };

  // Handle form inputs
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1>User Management</h1>
      {error && <p className="error">{error}</p>}

      <div className="form-container">
        <h2>Create New User</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChange}
        />
        <button onClick={createUser}>Create User</button>
      </div>

      <div className="users-container">
        <h2>User List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>ID:</strong> {user.id} <br />
              <strong>Username:</strong> {user.username} <br />
              <strong>Password:</strong> {user.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
