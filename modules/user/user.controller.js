// eslint-disable-next-line import/extensions
import AppError from '../../plugins/appError.js';
import { deleteUserById, findUserById } from './user.repository.js';

// eslint-disable-next-line import/prefer-default-export
export const deleteUserHandler = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return next(new AppError('User does not exist', 404));

    const deleted = await deleteUserById(user._id);

    return res.status(204).json({
      status: 'success',
      data: { deleted },
    });
  } catch (error) {
    next(error);
  }
};

export const getMeHandler = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!userId) return next(new AppError('Not authorized', 403));

    const user = await findUserById(userId);
    if (!user) return next(new AppError('User does not exist', 404));

    return res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
