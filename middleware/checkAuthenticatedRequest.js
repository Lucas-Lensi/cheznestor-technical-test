import AppError from '../plugins/appError.js';
import { verifyJwt } from '../modules/auth/auth.service.js';
import { findUserById } from '../modules/user/user.repository.js';

export default async (req, res, next) => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      // eslint-disable-next-line prefer-destructuring
      access_token = req.headers.authorization.split(' ')[1];

    if (!access_token) return next(new AppError('You are not logged in', 401));

    const decoded = verifyJwt(access_token);

    if (!decoded)
      return next(new AppError(`Invalid token or user doesn't exist`, 401));

    const user = await findUserById(decoded.userId);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
