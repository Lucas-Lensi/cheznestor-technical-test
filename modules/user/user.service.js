import lodash from 'lodash';
import userModel from './user.model.js';

const { omit } = lodash;

export const createUser = async (input) => {
  const user = await userModel.create(input);
  return omit(user.toObject(), 'password');
};

export const findUserById = async (_id) => {
  const user = await userModel.findById(_id).lean();
  return omit(user, 'password');
};

export const findUserByEmail = async (email) => {
  const user = await userModel.findOne({ email }).lean();
  return user;
};

export const deleteUserById = async (_id) => {
  const deletedUser = await userModel.deleteOne({ _id });
  return deletedUser;
};
