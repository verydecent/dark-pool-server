const router = require('express').Router();
const { register, login, accountActivation, forgotPassword, resetPassword } = require('../controllers/auth');
const { userRegistrationValidator, userLoginValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

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

module.exports = router;  