import { body } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const createRoomSchema = () => [
  body('title', 'Title is required').isString(),
  body('area', 'Area is required').isNumeric(),
  body('price', 'Price is required').isNumeric(),
  body('apartmentId', 'ApartmentId is required').isString(),
];

export const updateRoomSchema = () => [
  body('title').optional().isString(),
  body('area').optional().isNumeric(),
  body('price').optional().isNumeric(),
  body('apartmentId').optional().isString(),
];
