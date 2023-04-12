import Reservation from './reservation.model.js';

export const createReservation = (input) => Reservation.create(input);

export const findReservationById = (id) => Reservation.findById(id).lean();

export const findCurrentReservationFromRoom = (roomId) =>
  Reservation.find({
    roomId,
    status: 'booked',
  }).exec();

export const findCurrentReservationFromUser = (userId) =>
  Reservation.find({
    userId,
    status: 'booked',
  }).exec();

export const endReservation = async (id) =>
  Reservation.findByIdAndUpdate(id, { status: 'done' }, { new: true }).lean();
