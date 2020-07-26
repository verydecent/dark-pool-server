import { Router } from 'express';
import { register } from '../controllers/auth';

const router = Router();

router.get('/register', register);

export default router;
