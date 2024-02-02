// pages/login.js
"use client";
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/';
        console.log('Login successful!');
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email:
            <input
              className="w-full border border-gray-300 p-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              className="w-full border border-gray-300 p-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
