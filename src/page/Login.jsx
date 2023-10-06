import React, { useState } from 'react';
import axios from 'axios';

export const Login = () => {
  const [formData, setFormData] = useState({
    username: 'admin.root',
    password: 'admin.root',
  });

  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when making the request

    try {
      const response = await axios.post(
        'https://timesheet-api-main.onrender.com/admin/login',
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
          },
        }
      );

      setResponse(response.data);
    } catch (error) {
      console.error('Login failed:', error);
      setResponse({ message: 'Login failed', status: false });
    } finally {
      setIsLoading(false); // Set loading back to false regardless of success or failure
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        response && (
          <div>
            <p>Status: {response.status ? 'Success' : 'Failed'}</p>
            <p>Message: {response.message}</p>
            {response.access_token && (
              <p>Access Token: {response.access_token}</p>
            )}
          </div>
        )
      )}
    </div>
  );
};

