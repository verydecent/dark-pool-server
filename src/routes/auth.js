import { Router } from 'express';
import { register, login, accountActivation, forgotPassword, resetPassword } from '../controllers/auth';
import { userRegistrationValidator, userLoginValidator, forgotPasswordValidator, resetPasswordValidator } from '../validators/auth';
import { runValidation } from '../validators';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Auth Route Get Success' });
});

router.post('/register', userRegistrationValidator, runValidation, register);

router.post('/account-activation', accountActivation);

router.post('/login', userLoginValidator, runValidation, login);

// Send reset link to email
router.post('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);

// Confirm reset password
router.post('/reset-password', resetPasswordValidator, runValidation, resetPassword);

export default router;