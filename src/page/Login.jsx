
// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://timesheet-api-main.onrender.com/admin/login',
        {
         'username': "admin.root",
         'password': "admin.root"
        },
        {
          headers: {
            'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {

        console.log('Login successful');
      } else {
  
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};


