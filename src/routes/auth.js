import { Router } from 'express';
import models from '../models';
import { register, login, accountActivation } from '../controllers/auth';
import { userRegistrationValidator, userLoginValidator } from '../validators/auth';
import { runValidation } from '../validators';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Auth Route Get Success' });
});

router.post('/register', userRegistrationValidator, runValidation, register);

router.post('/account-activation', accountActivation);

router.post('/login', userLoginValidator, runValidation, login);

export default router;
