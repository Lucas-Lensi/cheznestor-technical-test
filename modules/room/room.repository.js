import Room from './room.model.js';

export const createRoom = (input) => Room.create(input);

export const findRoomById = (id) => Room.findById(id).exec();

export const findAllRooms = () => Room.find().exec();

export const updateRoomById = (id, input) =>
  Room.findByIdAndUpdate(id, input, {
    new: true,
  }).lean();

export const deleteRoomById = (id) => Room.deleteOne({ _id: id });
