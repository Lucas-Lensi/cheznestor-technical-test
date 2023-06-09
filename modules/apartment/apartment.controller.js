import AppError from '../../plugins/appError.js';
import {
  createApartment,
  findAllApartments,
  findApartmentById,
  updateApartmentById,
} from './apartment.repository.js';

export const createApartmentHandler = async (req, res, next) => {
  try {
    // eslint-disable-next-line prettier/prettier
    if (!req.user.isCommercial) return next(new AppError('Not authorized', 401));
    const apartment = await createApartment(req.body);
    return res.status(201).json({
      status: 'success',
      data: { apartment },
    });
  } catch (error) {
    next(error);
  }
};

export const getApartmentByIdHandler = async (req, res, next) => {
  try {
    const apartment = await findApartmentById(req.params.id);
    return res.status(200).json({
      status: 'success',
      data: { apartment },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllApartments = async (req, res, next) => {
  try {
    const apartments = await findAllApartments();
    return res.status(200).json({
      status: 'success',
      data: { apartments },
    });
  } catch (error) {
    next(error);
  }
};

export const putApartmentHandler = async (req, res, next) => {
  try {
    // eslint-disable-next-line prettier/prettier
    if (!req.user.isCommercial) return next(new AppError('Not authorized', 401));

    const apartment = await updateApartmentById(req.params.id, req.body);
    return res.status(200).json({
      status: 'success',
      data: { apartment },
    });
  } catch (error) {
    next(error);
  }
};
