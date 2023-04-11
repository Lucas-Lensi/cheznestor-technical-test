import { body } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const createRoomSchema = () => [
  body('title', 'Title is required').isString().bail().notEmpty(),
  body('area', 'Area is required').isNumeric(),
  body('price', 'Price is required').isNumeric(),
  body('apartmentId', 'ApartmentId is required').isString().bail().notEmpty(),
];

export const updateRoomSchema = () => [
  body('title').optional().isString().bail().notEmpty(),
  body('area').optional().isNumeric(),
  body('price').optional().isNumeric(),
  body('apartmentId').optional().isString().bail().notEmpty(),
];
