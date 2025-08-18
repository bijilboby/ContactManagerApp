const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

//Register User
const registerUser = async (req, res) => {
  const {username, email, password} = req.body;
  try{
    const userExists = await User.findOne({ email });
    if(userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Register error:', err); // log full error object
    res.status(500).send('Server error');
  }
};

// Login User

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  
  try{
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        return res.status(200).json({
          id: user._id,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  } catch (err) {
    console.error('Login error:', err); // log full error object
    res.status(500).send('Server error');
  }
};

//get username

const  me  = async (req, res) =>  {
  try {
    const user = await User.findById(req.user.id).select('username');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}

module.exports = { registerUser, loginUser, me };
