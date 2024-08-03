const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Session = require('../Models/Session');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const ipAddress = req.ip; // Get IP address
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create session
    const session = new Session({ userId: user._id, ipAddress });
    await session.save();

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/logout', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await Session.findOne({ userId: decoded.userId, logoutTime: null });
    if (session) {
      session.logoutTime = new Date();
      await session.save();
    }
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
