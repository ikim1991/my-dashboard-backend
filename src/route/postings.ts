import express from 'express';
import { fetchJobPosts, updateJobPosts } from '../controller/postings';
import authenticate from '../middleware/auth';

const router = express.Router();

router.post('update', authenticate, updateJobPosts)
router.get('postings', authenticate, fetchJobPosts)

export default router;