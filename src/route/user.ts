import express from 'express';
import { registerUser, logInUser, getUserData ,logOutUser } from '../controller/user';
import authenticate from '../middleware/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', logInUser);
router.get('/user', authenticate, getUserData);
router.get('/logout', authenticate ,logOutUser)

export default router;