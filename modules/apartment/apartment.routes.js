import express from 'express';
import validate from '../../middleware/validate.js';

import {
  createApartmentHandler,
  getAllApartments,
  getApartmentByIdHandler,
} from './apartment.controller.js';
import checkAuthenticatedRequest from '../../middleware/checkAuthenticatedRequest.js';
import { createApartmentSchema } from './apartment.schema.js';

const router = express.Router();

router.get('/', checkAuthenticatedRequest, getAllApartments);
router.get('/:id', checkAuthenticatedRequest, getApartmentByIdHandler);
router.post(
  '/',
  checkAuthenticatedRequest,
  createApartmentSchema(),
  validate,
  createApartmentHandler
);

export default router;
