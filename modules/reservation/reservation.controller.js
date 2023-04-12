/* eslint-disable prettier/prettier */
import AppError from '../../plugins/appError.js';
import { findRoomById } from '../room/room.repository.js';
import { findUserById } from '../user/user.repository.js';
import {
  createReservation,
  findReservationById,
  endReservation,
  findCurrentReservationFromRoom,
  findCurrentReservationFromUser
} from './reservation.repository.js';
import { calculateRental } from './reservation.service.js';

export const createReservationHandler = async (req, res, next) => {
  try {
    const reservationInput = req.body;
    const user = await findUserById(reservationInput.userId);
    const room = await findRoomById(reservationInput.roomId);

    if (!user || !room)
      return next(new AppError('User or room not found', 404));

    if ((await findCurrentReservationFromRoom(room)).length)
      return next(new AppError('Room already booked', 409));

    if ((await findCurrentReservationFromUser(user)).length)
      return next(new AppError('User already booked', 409));

    reservationInput.rental = await calculateRental(room);

    const reservation = await createReservation(reservationInput);
    return res.status(201).json({
      status: 'success',
      data: { reservation },
    });
  } catch (error) {
    next(error);
  }
};

export const getReservationByIdHandler = async (req, res, next) => {
  try {
    const reservation = await findReservationById(req.params.id);
    return res.status(200).json({
      status: 'success',
      data: { reservation },
    });
  } catch (error) {
    next(error);
  }
};

export const endReservationHandler = async (req, res, next) => {
  try {
    const reservation = await endReservation(req.params.id);
    return res.status(200).json({
      status: 'success',
      data: { reservation },
    });
  } catch (error) {
    next(error);
  }
};
