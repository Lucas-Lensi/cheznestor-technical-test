import Reservation from './reservation.model.js';

export const createReservation = async (input) => {
  const reservation = await Reservation.create(input);
  return reservation;
};

export const findReservationById = async (_id) => {
  const reservation = await Reservation.findById(_id).lean();
  return reservation;
};

export const findCurrentReservationFromRoom = async (roomId) => {
  const reservation = await Reservation.find({
    roomId,
    status: 'booked',
  }).exec();
  return reservation;
};

export const findCurrentReservationFromUser = async (userId) => {
  const reservation = await Reservation.find({
    userId,
    status: 'booked',
  }).exec();
  return reservation;
};

export const endReservation = async (_id) => {
  const endedReservation = await Reservation.findByIdAndUpdate(
    _id,
    { status: 'done' },
    { new: true }
  ).lean();
  return endedReservation;
};
