import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosInstance';
import cmaLogo from '../assets/cma-logo.svg';

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) return setMessage('Please enter a valid email');

    if (mode === 'register') {
      if (!username) return setMessage('Username is required');
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        setTimeout(() => setMessage(''), 1500);
        return;
      }

    }

    try {
      if (mode === 'register') {
        await api.post('/api/auth/register', { username, email, password });
        setMessage('Registration successful. Please sign in.');
        setTimeout(() => handleModeSwitch('login'), 1500);
      } else {
        const res = await api.post('/api/auth/login', { email, password });
        const token = res.data.token;
        localStorage.setItem('token', token);
        // NEW: store username
        localStorage.setItem('username', res.data.username || 'User');
        if (onLogin) onLogin(token);
        navigate('/');
      }
    } catch (err) {
      const serverMessage = err.response?.data?.msg;
      if (serverMessage?.toLowerCase().includes('invalid') || err.response?.status === 401) {
        setMessage('Invalid credentials');
        setTimeout(() => setMessage(''), 1500);
      } else {
        setMessage(serverMessage || 'An error occurred.');
        setTimeout(() => setMessage(''), 1500);
      }
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center">
      {/* CMA Logo */}
      <img
        src={cmaLogo}
        alt="CMA Logo"
        width={120}
        height={52}
        style={{ marginBottom: '1rem', display: 'block', objectFit: 'contain' }}
      />
      <h2 className="text-2xl font-semibold text-center mb-2">Contact Manager App</h2>
      <p className="text-center text-gray-600 text-sm mb-6">
        {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
      </p>

      {/* Mode Toggle Buttons */}
      <div className="flex mb-6 border rounded overflow-hidden w-full">
        <button
          onClick={() => handleModeSwitch('login')}
          className={`w-1/2 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${
            mode === 'login'
              ? 'text-white bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900'
              : 'text-gray-700 bg-gray-100'
          } hover:brightness-110 cursor-pointer`}
        >
          Sign In
        </button>

        <button
          onClick={() => handleModeSwitch('register')}
          className={`w-1/2 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${
            mode === 'register' ? 'text-white bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900' : 'text-gray-700 bg-gray-100'
          } hover:brightness-110 cursor-pointer`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Full name"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {mode === 'register' && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show password
        </label>

        <button
          type="submit"
          className="w-full py-2 rounded-md font-medium transition duration-300 ease-in-out bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-white shadow-md hover:brightness-110 focus:outline-none cursor-pointer"
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      {message && (
        <p
          className={`text-sm text-center mt-4 ${
            message.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  </div>
  );
}
