import express from 'express';
import { deleteUserHandler } from './user.controller.js';

const router = express.Router();

router.delete('/:id', deleteUserHandler);

export default router;
