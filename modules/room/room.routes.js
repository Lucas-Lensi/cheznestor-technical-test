import express from 'express';
import validate from '../../middleware/validate.js';

import {
  createRoomHandler,
  getAllRooms,
  getRoomByIdHandler,
  putRoomHandler,
} from './room.controller.js';
import checkAuthenticatedRequest from '../../middleware/checkAuthenticatedRequest.js';
import { createRoomSchema, updateRoomSchema } from './room.schema.js';

const router = express.Router();

router.get('/', checkAuthenticatedRequest, getAllRooms);
router.get('/:id', checkAuthenticatedRequest, getRoomByIdHandler);

router.put(
  '/:id',
  checkAuthenticatedRequest,
  updateRoomSchema(),
  validate,
  putRoomHandler
);

router.post(
  '/',
  checkAuthenticatedRequest,
  createRoomSchema(),
  validate,
  createRoomHandler
);

export default router;
