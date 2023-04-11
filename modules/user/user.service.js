import lodash from 'lodash';
import User from './user.model.js';

const { omit } = lodash;

export const createUser = async (input) => {
  const user = await User.create(input);
  return user ? omit(user.toObject(), 'password') : user;
};

export const findUserById = async (_id) => {
  const user = await User.findById(_id).exec();
  return user;
};

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select('+password').exec();
  return user;
};

export const deleteUserById = async (_id) => {
  const deletedUser = await User.deleteOne({ _id });
  return deletedUser;
};
