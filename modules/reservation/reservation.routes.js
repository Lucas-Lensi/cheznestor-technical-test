import express from 'express';
import validate from '../../middleware/validate.js';

import checkAuthenticatedRequest from '../../middleware/checkAuthenticatedRequest.js';
import { createReservationSchema } from './reservation.schema.js';
import {
  createReservationHandler,
  endReservationHandler,
  getReservationByIdHandler,
} from './reservation.controller.js';

const router = express.Router();

router.get('/:id', checkAuthenticatedRequest, getReservationByIdHandler);
router.put('/end/:id', checkAuthenticatedRequest, endReservationHandler);

router.post(
  '/',
  checkAuthenticatedRequest,
  createReservationSchema(),
  validate,
  createReservationHandler
);

export default router;
