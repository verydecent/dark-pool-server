import { Router } from 'express';
import models from '../models';
import { register } from '../controllers/auth';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Auth Route Get Success' });
});

router.post('/register', register);

export default router;
