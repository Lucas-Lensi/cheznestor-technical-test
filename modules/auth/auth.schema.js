import { body } from 'express-validator';

export const loginSchema = () => [
  body('email', 'Email is required')
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage('Invalid email'),
  body('password', 'Password is required').notEmpty(),
];

export const registerSchema = () => [
  body('firstname', 'Firstname is required').isString().notEmpty(),
  body('lastname', 'Lastname is required').isString().notEmpty(),
  body('email', 'Email is required')
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage('Invalid email'),
  body('password', 'Password is required')
    .notEmpty()
    .bail()
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 chars long'),
  body('password_confirmation', 'Password confirmation is required')
    .isString()
    .custom(async (value, { req }) => {
      if (value !== req.body.password)
        throw new Error('Password confirmation does not match password');
      return true;
    }),
];
