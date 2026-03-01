// API Routes (TRIGGER: Documentation ↔ Code comparator)
// This code has been modified but README not updated!

import express from 'express';

const router = express.Router();

// User routes
router.get('/api/users', async (req, res) => {
  // Get all users
  res.json([]);
});

router.post('/api/users', async (req, res) => {
  // Create user
  res.status(201).json({});
});

router.get('/api/users/:id', async (req, res) => {
  // Get user by ID
  res.json({});
});

// NEW ROUTE - README not updated to document this!
router.delete('/api/users/:id', async (req, res) => {
  // Delete user
  res.status(204).send();
});

// NEW ROUTE - README not updated to document this!
router.patch('/api/users/:id', async (req, res) => {
  // Update user
  res.json({});
});

export default router;
