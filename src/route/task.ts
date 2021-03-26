import express from 'express';
import { createTask, deleteTask, getTasks, toggleTask } from '../controller/task';
import authenticate from '../middleware/auth';

const router = express.Router();

router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getTasks);
router.post('/toggle', authenticate, toggleTask);
router.post('/delete', authenticate, deleteTask);

export default router;