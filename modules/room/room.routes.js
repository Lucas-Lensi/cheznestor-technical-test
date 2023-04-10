import express from 'express';
import validate from '../../middleware/validate.js';

import { createRoomHandler, getRoomByIdHandler } from './room.controller.js';
import checkAuthenticatedRequest from '../../middleware/checkAuthenticatedRequest.js';
import { createRoomSchema } from './room.schema.js';

const router = express.Router();

router.get('/:id', checkAuthenticatedRequest, getRoomByIdHandler);
router.post(
  '/',
  checkAuthenticatedRequest,
  createRoomSchema(),
  validate,
  createRoomHandler
);

export default router;
