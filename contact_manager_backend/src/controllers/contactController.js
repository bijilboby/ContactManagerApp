const Contact = require("../models/Contact");

// @desc    Get all contacts of logged-in user
// @route   GET /api/contacts
// @access  Private
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// @desc    Add new contact
// @route   POST /api/contacts
// @access  Private
const addContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });
    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Ensure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Ensure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact removed" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getContacts,
  addContact,
  updateContact,
  deleteContact
};

