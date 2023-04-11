/* eslint-disable import/prefer-default-export */
import { body } from 'express-validator';

export const createReservationSchema = () => [
  body('userId', 'UserId is required').isString().bail().notEmpty(),
  body('roomId', 'RoomId is required').isString().bail().notEmpty(),
  body('status').optional().isString().isIn(['booked', 'done']),
];
