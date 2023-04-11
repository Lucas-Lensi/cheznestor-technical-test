import { body } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const createApartmentSchema = () => [
  body('title', 'Title is required').isString().notEmpty(),
  body('area', 'Area is required').isNumeric(),
  body('floor').optional().isNumeric(),
  body('address.street', 'Street is required').isString().notEmpty(),
  body('address.zipCode', 'ZipCode is required').isString().notEmpty(),
  body('address.city', 'City is required').isString().notEmpty(),
  body('address.country', 'Country is required').isString().notEmpty(),
];

export const updateApartmentSchema = () => [
  body('title').optional().isString().notEmpty(),
  body('area').optional().isNumeric(),
  body('floor').optional().isNumeric(),
  body('address.street').optional().isString().notEmpty(),
  body('address.zipCode').optional().isString().notEmpty(),
  body('address.city').optional().isString().notEmpty(),
  body('address.country').optional().isString().notEmpty(),
];
