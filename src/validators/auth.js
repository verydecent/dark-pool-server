import { check } from 'express-validator';

export const userRegistrationValidator = [
  check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid Email Address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];                            