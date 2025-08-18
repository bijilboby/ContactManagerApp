const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",// reference to User model
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "personal" // can be personal or professional
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Contact", contactSchema);
// Exporting the Contact model based on the contactSchema
