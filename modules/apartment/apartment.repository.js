import Apartment from './apartment.model.js';

export const createApartment = (input) => Apartment.create(input);

export const findApartmentById = (id) => Apartment.findById(id).exec();

export const findAllApartments = () => Apartment.find().exec();

export const updateApartmentById = (id, input) =>
  Apartment.findByIdAndUpdate(id, input, {
    new: true,
  }).lean();

export const deleteApartmentById = (id) => Apartment.deleteOne({ _id: id });
