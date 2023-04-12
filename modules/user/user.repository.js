import User from './user.model.js';

export const createUser = (input) => User.create(input);

export const findUserById = (id) => User.findById(id).exec();

export const findUserByEmail = (email) =>
  User.findOne({ email }).select('+password').exec();

export const deleteUserById = (id) => User.deleteOne({ _id: id });
