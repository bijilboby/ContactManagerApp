import { useEffect, useState } from 'react';
import api from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/navbar';
import trash from '../assets/trash.svg';
import edit from '../assets/edit.svg';
import envelope from '../assets/envelope.svg';
import telephone from '../assets/telephone.svg';
import search from '../assets/search.svg';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editCountryCode, setEditCountryCode] = useState('+91-');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const countryCodes = [
    { code: '+91-', name: 'India 🇮🇳' },
    { code: '+1-', name: 'USA 🇺🇸' },
    { code: '+44-', name: 'UK 🇬🇧' },
    { code: '+61-', name: 'Australia 🇦🇺' },
    { code: '+81-', name: 'Japan 🇯🇵' },
  ];

  const fetchContacts = () => {
    api.get('/api/contacts')
      .then(res => {
        setContacts(res.data);
      })
      .catch(err => {
        setMessage(err.response?.data?.msg || 'Failed to load contacts');
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/api/contacts/${id}`);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    const matchedCode = countryCodes.find(c => contact.phone.startsWith(c.code))?.code || '+91-';
    const number = contact.phone.replace(matchedCode, '').trim();

    setEditingContact(contact._id);
    setEditCountryCode(matchedCode);
    setEditPhone(number);
    setEditName(contact.name);
    setEditEmail(contact.email);
  };

  const handleUpdate = async () => {
    const fullPhone = `${editCountryCode}${editPhone}`;
    await api.put(`/api/contacts/${editingContact}`, {
      name: editName,
      email: editEmail,
      phone: fullPhone,
    });
    setEditingContact(null);
    fetchContacts();
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <>  
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-4 pt-32">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Contacts</h1>
            <p className="text-lg text-gray-500">Manage your contact information</p>
          </div>
         <button
            onClick={() => navigate('/add-contact')}
            className="text-white text-base font-semibold py-2 px-6 rounded shadow flex items-center mt-6 sm:mt-0 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:brightness-110 transition"
          >
            <span className="text-xl mr-2">+</span> Add Contact
          </button>

        </div>

        <div className="mb-6 relative">
        {/* Search Icon */}
        <img 
          src={search} 
          alt="search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />

        {/* Input Box */}
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search contacts..."
          className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
        />
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredContacts.length === 0 ? (
    <div className="col-span-full text-center text-gray-500 py-10">
      No contacts found.
    </div>
  ) : (
    filteredContacts.map(contact => (
      <div
        key={contact._id}
        className="rounded-lg bg-white shadow-sm p-6 flex flex-col justify-between h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg overflow-hidden"
      >
        {/* Top: Contact Info with extra right padding */}
        <div className="pr-6"> {/* <-- Add right padding */}
          <h2 className="text-xl font-semibold text-gray-900 mb-1 truncate" title={contact.name}>
            {contact.name}
          </h2>
          <div className="flex items-center text-gray-700 text-sm mb-1">
            <img src={telephone} alt="Phone" width={16} height={16} className="mr-2" />
            <span className="truncate" title={contact.phone}>{contact.phone}</span>
          </div>
          <div className="flex items-center text-gray-700 text-sm">
            <img src={envelope} alt="Email" width={16} height={16} className="mr-2" />
            <span className="truncate" title={contact.email}>{contact.email}</span>
          </div>
        </div>
        {/* Bottom: Action Buttons (bottom right) */}
        <div className="flex gap-2 mt-6 justify-end">
          <button
            onClick={() => handleEdit(contact)}
            className="group rounded-md p-2 transition-colors duration-200 hover:bg-gray-200 cursor-pointer flex items-center justify-center"
            title="Edit"
            style={{ minWidth: '36px', minHeight: '36px' }}
          >
            <img
              src={edit}
              alt="Edit"
              width={16}
              height={16}
              className="group-hover:brightness-75 transition duration-200"
            />
          </button>
          <button
            onClick={() => handleDelete(contact._id)}
            className="group rounded-md p-2 transition-colors duration-200 hover:bg-red-500 cursor-pointer flex items-center justify-center"
            title="Trash"
            style={{ minWidth: '36px', minHeight: '36px' }}
          >
            <img
              src={trash}
              alt="Trash"
              width={16}
              height={16}
              className="transition duration-200 group-hover:filter group-hover:brightness-0 group-hover:invert"
            />
          </button>
        </div>
      </div>
    ))
  )}
</div>






        <div className="mt-8 text-center">
          <span className="inline-block bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded text-sm shadow-sm">
            {filteredContacts.length} contacts found
          </span>
        </div>
      </div>
    </div>

      {/* Edit Modal */}
      {editingContact && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
            <h3 className="text-lg font-semibold">Edit Contact</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-2">
              <select
                value={editCountryCode}
                onChange={(e) => setEditCountryCode(e.target.value)}
                className="w-1/3 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-2/3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleUpdate}
                className="text-white px-6 py-2 rounded-md shadow-sm transition text-base font-medium cursor-pointer hover:brightness-110"
                style={{
                  background:
                    'linear-gradient(to right, #3b82f6, #2563eb, #1e40af)',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)',
                }}
              >
                Save
              </button>
              <button
                onClick={() => setEditingContact(null)}
                className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
