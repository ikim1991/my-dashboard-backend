import express from 'express';
import { registerUser, logInUser, getUserData ,logOutUser } from '../controller/user';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', logInUser);
router.get('/user', getUserData);
router.get('/logout', logOutUser)

export default router;