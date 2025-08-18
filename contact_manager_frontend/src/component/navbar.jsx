import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cmaLogo from '../assets/cma-logo.svg';

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/auth');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="bg-white shadow-lg py-4 flex justify-between items-center fixed top-0 w-full z-50"
      style={{
        borderBottom: '4px solid',
        borderImageSlice: 1,
        borderWidth: '0 0 4px 0',
        borderImageSource: 'linear-gradient(to right, #3b82f6, #2563eb, #1e40af)',
        paddingLeft: '2.5rem',   // added left padding
        paddingRight: '2.5rem',  // added right padding
      }}
    >
      {/* Left: Logo with padding */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate('/')}
        style={{ minHeight: 52 }}
      >
        <img
          src={cmaLogo}
          alt="CMA Logo"
          width={120}
          height={52}
          style={{ display: 'block', objectFit: 'contain' }}
        />
      </div>

      {/* Right: 3 dots icon and dropdown with padding */}
      <div className="relative" ref={dropdownRef} style={{ paddingRight: '2.5rem' }}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
          aria-label="User Menu"
          title="User menu"
        >
          {/* Three Dots Ellipsis SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <circle cx="3" cy="10" r="2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="17" cy="10" r="2" />
          </svg>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
           <button
  onClick={handleLogout}
  className="w-full text-center px-4 py-2 cursor-pointer rounded-md 
             bg-clip-text text-transparent 
             bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 
             hover:bg-red-600 hover:text-white 
             transition duration-200"
>
  Logout
</button>




          </div>
        )}
      </div>
    </nav>
  );
}
