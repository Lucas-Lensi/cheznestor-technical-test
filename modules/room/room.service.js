import roomModel from './room.model.js';

export const createRoom = async (input) => {
  const room = await roomModel.create(input);
  return room;
};

export const findRoomById = async (_id) => {
  const room = await roomModel.findById(_id).lean();
  return room;
};

export const findAllRooms = async () => {
  const rooms = await roomModel.find().lean();
  return rooms;
};

export const deleteRoomById = async (_id) => {
  const deletedRoom = await roomModel.deleteOne({ _id });
  return deletedRoom;
};
