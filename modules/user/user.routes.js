import express from 'express';
import { deleteUserHandler, getMeHandler } from './user.controller.js';
import checkAuthenticatedRequest from '../../middleware/checkAuthenticatedRequest.js';

const router = express.Router();

router.get('/me', checkAuthenticatedRequest, getMeHandler);
router.delete('/:id', deleteUserHandler);

export default router;
