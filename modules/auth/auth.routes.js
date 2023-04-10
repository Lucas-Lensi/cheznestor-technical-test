import express from 'express';
import validate from '../../middleware/validate.js';

import { loginSchema, registerSchema } from './auth.schema.js';
import { loginHandler, registerHandler } from './auth.controller.js';

const router = express.Router();

router.post('/register', registerSchema(), validate, registerHandler);
router.post('/login', loginSchema(), validate, loginHandler);

export default router;
