import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Contacts from './pages/Contacts';
import AddContact from './pages/AddContact';

export default function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    // redirect to /auth if no token and not already there
    if (!token && window.location.pathname !== '/auth') {
      navigate('/auth');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/auth');
  };

  return (
    <div className=" min-h-screen bg-gray-50">

      <Routes>
        {/* Home Dashboard Page */}
        <Route path="/" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/auth" element={<Auth onLogin={setToken} />} />


        {/* Protected Routes */}
        <Route
          path="/contacts"
          element={token ? <Contacts /> : <Navigate to="/auth" />}
        />
        <Route
          path="/add-contact"
          element={token ? <AddContact /> : <Navigate to="/auth" />}
        />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<p>404 - Page Not Found</p>} />
      </Routes>
    </div>
  );
}
