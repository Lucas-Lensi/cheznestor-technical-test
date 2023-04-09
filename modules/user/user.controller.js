// eslint-disable-next-line import/extensions
import AppError from '../../plugins/appError.js';
import { deleteUserById, findUserById } from './user.service.js';

// eslint-disable-next-line import/prefer-default-export
export const deleteUserHandler = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return new AppError('User does not exist', 404);

    const deleted = await deleteUserById(user._id);

    return res.status(204).json({
      status: 'success',
      data: { deleted },
    });
  } catch (error) {
    next(error);
  }
};
