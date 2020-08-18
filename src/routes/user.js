import { Router } from 'express';
import { readUser, updateUser } from '../controllers/user';
import { requireLogin, adminMiddleware } from '../controllers/auth';

const router = Router();

// Retrieve user info based on user id
router.get('/:id', requireLogin, readUser);

// Update Subscriber user info
router.put('/', requireLogin, updateUser);

// Update Admin user info
router.put('/admin/update', requireLogin, adminMiddleware, updateUser);

export default router;
