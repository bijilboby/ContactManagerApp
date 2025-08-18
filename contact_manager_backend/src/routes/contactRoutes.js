const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getContacts,
  addContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

// GET all contacts
router.get('/', authMiddleware, getContacts);

// POST new contact
router.post('/', authMiddleware, addContact);

// PUT update contact
router.put('/:id', authMiddleware, updateContact);

// DELETE contact
router.delete('/:id', authMiddleware, deleteContact);

module.exports = router;


