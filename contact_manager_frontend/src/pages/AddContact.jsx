import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosInstance';
import Navbar from '../component/navbar';
import one from '../assets/one.svg';
import save from '../assets/save.svg';

export default function AddContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91-');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const countryCodes = [
    { code: '+91-', name: 'India 🇮🇳' },
    { code: '+1-', name: 'USA 🇺🇸' },
    { code: '+44-', name: 'UK 🇬🇧' },
    { code: '+61-', name: 'Australia 🇦🇺' },
    { code: '+81-', name: 'Japan 🇯🇵' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullPhone = `${countryCode}${phone}`;
    try {
      await api.post('/api/contacts', { name, email, phone: fullPhone });
      setMessage('Contact added successfully!');
      setTimeout(() => navigate('/contacts'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Failed to add contact');
    }
  };

  return (
<>
    <Navbar />
 <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
    {/* Header with Back and Title (centered, similar to screenshot) */}
    <div className="flex items-center mb-1">
      <button
        type="button"
        onClick={() => navigate('/contacts')}
        className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-50 text-2xl mr-3 hover:bg-gray-200 cursor-pointer"
        aria-label="Back"
      >
        ←
      </button>
      <div className="mx-auto">
        <h2 className="text-2xl font-bold leading-tight text-center">Add New Contact</h2>
        <p className="text-gray-500 text-center text-sm">Fill in the contact information below</p>
      </div>
    </div>

    {/* Main Form Card */}
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {/* Contact Information Section Title */}
      <div className="flex items-center mb-2">
        <span className="text-2xl text-blue-900 mr-2">
          <img src={one} alt="Add Icon" width={26} height={26} />
        </span>
        <h3 className="font-semibold text-lg">Contact Information</h3>
      </div>

      {/* Full Name Field */}
      <div>
        <label className="block font-medium mb-1" htmlFor="name">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
        />
      </div>

      {/* Phone Number Field with Country Code Dropdown */}
      <div>
        <label className="block font-medium mb-1" htmlFor="phone">
          Phone Number <span className="text-red-600">*</span>
        </label>
        <div className="flex">
          <select
            value={countryCode}
            onChange={e => setCountryCode(e.target.value)}
            className="w-1/3 px-2 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-600"
          >
            {countryCodes.map(c => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            id="phone"
            type="tel"
            placeholder="e.g., 123-456-7890"
            value={phone}
            onChange={e => {
              const val = e.target.value;
              if (/^\d{0,10}$/.test(val)) {
                setPhone(val);
              }
            }}
            required
            maxLength={10}
            className="w-2/3 px-4 py-2 border-t border-b border-r border-gray-300 rounded-r-md focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label className="block font-medium mb-1" htmlFor="email">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="contact@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md font-medium text-white bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 shadow-md cursor-pointer hover:brightness-110 transition"
        >
          <img src={save} alt="Add Icon" width={19} height={19} />
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate('/contacts')}
          className="w-full py-2 rounded-md border border-gray-300 font-medium text-gray-700 cursor-pointer hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>
      {message && (
        <p className="text-center text-sm text-blue-600 mt-2">{message}</p>
      )}

     
    </form>
  </div>
</div>
</>
);

}
