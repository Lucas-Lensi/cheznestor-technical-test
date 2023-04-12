import AppError from '../../plugins/appError.js';
import { createUser, findUserByEmail } from '../user/user.repository.js';
import { deletePasswordFromUser } from '../user/user.service.js';
import { comparePasswords, signJwt } from './auth.service.js';

export const loginHandler = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user || !(await comparePasswords(req.body.password, user.password)))
      return next(new AppError('Invalid email or password', 401));

    const accessToken = await signJwt(user);

    return res.status(200).json({
      status: 'success',
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const registerHandler = async (req, res, next) => {
  try {
    const existingUser = await findUserByEmail(req.body.email);
    if (existingUser) return next(new AppError('User already exist', 409));

    const userDocument = await createUser(req.body);
    const user = await deletePasswordFromUser(userDocument.toObject());

    return res.status(201).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
