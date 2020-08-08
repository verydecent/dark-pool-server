import { Router } from 'express';
import models from '../models';
import { register } from '../controllers/auth';
import { userRegistrationValidator } from '../validators/auth';
import { runValidation } from '../validators';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Auth Route Get Success' });
});

router.post('/register', userRegistrationValidator, runValidation, register);

export default router;
