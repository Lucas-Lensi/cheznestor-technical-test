import AppError from '../../plugins/appError.js';
import { findApartmentById } from '../apartment/apartment.service.js';
import { createRoom, findRoomById } from './room.service.js';

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
    return res.status(200).json({
      status: 'success',
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};
