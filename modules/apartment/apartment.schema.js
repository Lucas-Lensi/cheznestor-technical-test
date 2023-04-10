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

export const updateApartmentSchema = () => [
  body('title').optional().isString(),
  body('area').optional().isNumeric(),
  body('floor').optional().isNumeric(),
  body('address.street').optional().isString(),
  body('address.zipCode').optional().isString(),
  body('address.city').optional().isString(),
  body('address.country').optional().isString(),
];
