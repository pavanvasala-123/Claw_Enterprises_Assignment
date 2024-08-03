const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../Models/Todo');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.userId;
    next();
  });
};

router.post('/todos', authenticate, async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({ userId: req.userId, title });
  await todo.save();
  res.status(201).json(todo);
});

router.get('/todos', authenticate, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

router.put('/todos/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const todo = await Todo.findOneAndUpdate({ _id: id, userId: req.userId }, { title, status }, { new: true });
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

router.delete('/todos/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

module.exports = router;
