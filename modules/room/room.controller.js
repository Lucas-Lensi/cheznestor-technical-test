import AppError from '../../plugins/appError.js';
import { findApartmentById } from '../apartment/apartment.service.js';
import { findCurrentReservationFromRoom } from '../reservation/reservation.service.js';
import {
  createRoom,
  findRoomById,
  findAllRooms,
  updateRoomById,
} from './room.service.js';

export const createRoomHandler = async (req, res, next) => {
  try {
    // eslint-disable-next-line prettier/prettier
    if (!req.user.isCommercial) return next(new AppError('Not authorized', 401));

    if (!(await findApartmentById(req.body.apartmentId)))
      return next(new AppError('Apartment not found', 404));

    const room = await createRoom(req.body);
    return res.status(201).json({
      status: 'success',
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};

export const getRoomByIdHandler = async (req, res, next) => {
  try {
    const room = await findRoomById(req.params.id);
    room.available = !(await findCurrentReservationFromRoom(room._id));
    return res.status(200).json({
      status: 'success',
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await findAllRooms();
    return res.status(200).json({
      status: 'success',
      data: { rooms },
    });
  } catch (error) {
    next(error);
  }
};

export const putRoomHandler = async (req, res, next) => {
  try {
    // eslint-disable-next-line prettier/prettier
    if (!req.user.isCommercial) return next(new AppError('Not authorized', 401));
    const room = await updateRoomById(req.params.id, req.body);
    return res.status(200).json({
      status: 'success',
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};
