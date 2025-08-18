import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../component/navbar';
import api from '../axiosInstance';
import add from '../assets/add.svg';
import view from '../assets/view-pro.svg';
import search from '../assets/search.svg';


export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await api.get('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUsername(res.data.username);
        } catch (err) {
          console.error('Failed to fetch username', err);
        }
      };

      fetchUsername();
    }, []);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 pt-28">
        <div className="w-full max-w-3xl text-center space-y-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Welcome, {username || 'User'}!
          </h1>
          <p className="text-lg text-gray-500 mb-4">
            Keep all your important contacts organized and easily accessible in one secure place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/contacts')}
              className="bg-white shadow-md rounded-md py-6 px-4 flex flex-col items-center font-medium text-blue-900 hover:bg-gray-100 transition cursor-pointer group"
            >
              <img
                src={view}
                alt="View Contacts"
                width={48}
                height={48}
                className="mb-3"
              />
              View Contacts
              <span className="block mt-2 text-sm text-gray-500">
                Browse and search through all your saved contacts
              </span>
              <span className="mt-4 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-white py-2 px-6 rounded text-base font-semibold shadow hover:brightness-110 transition cursor-pointer">
                View All Contacts
              </span>
            </button>
            <button
              onClick={() => navigate('/add-contact')}
              className="bg-white shadow-md rounded-md py-6 px-4 flex flex-col items-center font-medium text-blue-900 hover:bg-gray-100 transition cursor-pointer group"
            >
              <img
                src={add}
                alt="Add Contact"
                width={48}
                height={48}
                className="mb-3"
              />
              Add Contact
              <span className="block mt-2 text-sm text-gray-500">
                Quickly add new contacts to your vault
              </span>
              <span className="mt-4 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-white py-2 px-6 rounded text-base font-semibold shadow hover:brightness-110 transition cursor-pointer">
                Add New Contact
              </span>
            </button>
            <button
              onClick={() => navigate('/contacts')}
              className="bg-white shadow-md rounded-md py-6 px-4 flex flex-col items-center font-medium text-blue-900 hover:bg-gray-100 transition cursor-pointer group"
            >
              <img
                src={search}
                alt="Search Contacts"
                width={48}
                height={48}
                className="mb-3"
              />
              Quick Search
              <span className="block mt-2 text-sm text-gray-500">
                Find contacts instantly with powerful search
              </span>
              <span className="mt-4 border border-gray-300 bg-white text-blue-900 py-2 px-6 rounded text-base font-semibold hover:bg-gray-100 transition cursor-pointer">
                Search Contacts
              </span>
            </button>
          </div>
        </div>
      </div>
    </>

  );
}
