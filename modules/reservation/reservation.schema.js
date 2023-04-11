/* eslint-disable import/prefer-default-export */
import { body } from 'express-validator';

export const createReservationSchema = () => [
  body('userId', 'UserId is required').isString().notEmpty(),
  body('roomId', 'RoomId is required').isString().notEmpty(),
  body('status').optional().isString().isIn(['booked', 'done']),
];
