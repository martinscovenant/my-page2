
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

 export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      const response = await fetch('https://timesheet-api-main.onrender.com/admin/login', {
        method: 'POST',
        headers: {
         ' x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('login succesful')
        navigate('/');
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


