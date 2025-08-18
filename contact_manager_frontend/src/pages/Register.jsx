import { useState } from 'react';
import api from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const isValidEmail = (email) => {
      // Simple but effective email regex pattern
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address");
      return;
    }
    try {
      const res = await api.post('/api/auth/register', {
        username,
        email,
        password
      });
      setMessage(`Success: ${res.data.msg || "Registered Successfully"}`)
      // Optionally redirect to login page after successful registration
      setMessage('Registration successful, redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);  // 1.5s delay

    } catch (error) {
      console.error(error);
      setMessage( error.response.data.msg || "User Already Exists")
      {message && (
        <p style={{ color: message.toLowerCase().includes('success') ? 'green' : 'red' }}>
          {message}
        </p>
      )}

    }
  }

return (
  <div style = {{padding: 24}}>
    <h2>Register</h2>
    <form onSubmit = {handleSubmit}>
      <div>
        <input
          type = "text"
          placeholder='Enter your name'
          value = {username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type = "email"
          placeholder='Enter your email'
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type = "password"
          placeholder='Enter your password'
          value = {password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type = "password"
          placeholder='Confirm your password'
          value = {confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>
      Already have an account?{' '}
      <button
        style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </p>
    {message && <p>{message}</p>}
  </div>
)}

export default Register