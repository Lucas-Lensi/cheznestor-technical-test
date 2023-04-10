import { body } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const createApartmentSchema = () => [
  body('title', 'Title is required').isString(),
  body('area', 'Area is required').isNumeric(),
  body('floor').optional().isNumeric(),
  body('address.street', 'Street is required').isString(),
  body('address.zipCode', 'ZipCode is required').isString(),
  body('address.city', 'City is required').isString(),
  body('address.country', 'Country is required').isString(),
];
