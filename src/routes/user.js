import { Router } from 'express';
import { readUser, updateUser } from '../controllers/user';
import { requireLogin } from '../controllers/auth';

const router = Router();

router.get('/:id', requireLogin, readUser);

router.put('/:id', requireLogin, updateUser);

export default router;
