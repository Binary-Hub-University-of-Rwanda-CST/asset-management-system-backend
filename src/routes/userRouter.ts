import express from 'express';
import { createUser, getAllUsers } from '../services/userService';

const router = express.Router();

router.post('/users', async (req, res) => {
  const { email, name } = req.body;

  try {
    const newUser = await createUser(email, name);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching users');
  }
});

export default router;