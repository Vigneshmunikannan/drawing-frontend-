import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../routes/Context";

function Admin() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setResponse("Enter both username and password");
      setTimeout(() => {
        setResponse("");
      }, 2000);
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}admin/login`, {
        username,
        password
      });
      // Handle login logic here
      login(response.data.token)
      setResponse("Login success");
      setTimeout(() => {
        setResponse("");
      }, 2000);
    } catch (error) {
      setResponse(error.response.data);
      setTimeout(() => {
        setResponse("");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />
        {response && (
          <p className="text-red-500 text-center mb-4">{response}</p>
        )}
        <button
          className="bg-blue-500 text-white rounded-md py-2 px-4 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Admin;
