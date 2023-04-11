import Room from './room.model.js';

export const createRoom = async (input) => {
  const room = await Room.create(input);
  return room;
};

export const findRoomById = async (_id) => {
  const room = await Room.findById(_id).exec();
  return room;
};

export const findAllRooms = async () => {
  const rooms = await Room.find().exec();
  return rooms;
};

export const updateRoomById = async (_id, input) => {
  const updatedRoom = await Room.findByIdAndUpdate(_id, input, {
    new: true,
  }).lean();
  return updatedRoom;
};

export const deleteRoomById = async (_id) => {
  const deletedRoom = await Room.deleteOne({ _id });
  return deletedRoom;
};
