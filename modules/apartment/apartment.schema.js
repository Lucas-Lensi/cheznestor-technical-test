import { body } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const createApartmentSchema = () => [
  body('title', 'Title is required').isString().bail().notEmpty(),
  body('area', 'Area is required').isNumeric(),
  body('floor').optional().isNumeric(),
  body('address.street', 'Street is required').isString().bail().notEmpty(),
  body('address.zipCode', 'ZipCode is required').isString().bail().notEmpty(),
  body('address.city', 'City is required').isString().bail().notEmpty(),
  body('address.country', 'Country is required').isString().bail().notEmpty(),
];

export const updateApartmentSchema = () => [
  body('title').optional().isString().bail().notEmpty(),
  body('area').optional().isNumeric(),
  body('floor').optional().isNumeric(),
  body('address.street').optional().isString().bail().notEmpty(),
  body('address.zipCode').optional().isString().bail().notEmpty(),
  body('address.city').optional().isString().bail().notEmpty(),
  body('address.country').optional().isString().bail().notEmpty(),
];
