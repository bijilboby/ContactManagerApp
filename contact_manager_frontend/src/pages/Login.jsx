import api from '../axiosInstance';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login',{
        email,
        password
      });
      const token = res.data.token;
      // Save token to localStorage or context
      localStorage.setItem('token', token);
      setMessage('Login successful');
      if (onLogin) onLogin(token); // Call onLogin if provided
      navigate('/'); // Redirect to Home page
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || 'Invalid Username or Password');
      {message && (
          <p style={{ color: message.toLowerCase().includes('success') ? 'green' : 'red' }}>
            {message}
          </p>
        )}

    }
  };

  return (
    <div style ={{ padding: 24}}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{' '}
        <button
          style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </p>
      {message && <p>{message}</p>}
    </div>
  )

};

export default Login;
  