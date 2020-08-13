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

export const userLoginValidator = [
  check('email')
    .isEmail()
    .withMessage('Must be a valid Email Address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

export const forgotPasswordValidator = [
  check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid email address')
];

export const resetPasswordValidator = [
  check('newPassword')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];