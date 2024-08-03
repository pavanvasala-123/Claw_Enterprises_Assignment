const express = require('express');
const jwt = require('jsonwebtoken');
const Session = require('../Models/Session');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.userId;
    next();
  });
};

router.get('/sessions', authenticate, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
