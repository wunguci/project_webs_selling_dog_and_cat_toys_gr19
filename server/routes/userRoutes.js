import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login, 
  register,
  checkDuplicate
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', login);
router.post('/register', register);
router.post('/check-duplicate', checkDuplicate);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;