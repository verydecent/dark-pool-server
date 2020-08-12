import { Router } from 'express';
import { readUser } from '../controllers/user';

const router = Router();

router.get('/:id', readUser);

export default router;
